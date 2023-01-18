import Container from '../components/Container'
import UI from '../components/UI'
import axios from 'axios'
import { useState, useEffect } from 'react'
import AlertDialog from '../components/AlertDialog'
import { useRouter } from 'next/router';
import UINew from '../components/UINew'

export default function Index(props) {
  // document list
  const docs = props && props.data && props.data['docs'] ? props.data['docs'] : ['Failed to load docs...'];

  // init router
  const router = useRouter();

  // data states
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [selectedLength, setSelectedLength] = useState('longer');
  const [selectedTemp, setSelectedTemp] = useState('thoughtful');
  const [query, setQuery] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [responseStream, setResponseStream] = useState([]);
  // loading states
  const [loading, setLoading] = useState(false);
  const [loadingStream, setLoadingStream] = useState(false);
  const [flash, setFlash] = useState('')
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [cancelToken, setCancelToken] = useState(null);
  // ui states
  const [alertOpen, setAlertOpen] = useState(false);
  const [alert, setAlert] = useState('');

  useEffect(() => {
    console.log(selectedDoc)
  }, [selectedDoc])

  //! make a semantic QA request to the API -------------------------------------
  async function getResponse() {

    // handle errors
    if (selectedDoc === null) {
      setAlert("Please select a document. Can't answer your questions without a document.");
      setAlertOpen(true);
      return;
    }
    if (query === '') {
      setAlert("You have to enter a query. I'm not a mind reader.");
      setAlertOpen(true);
      return;
    }

    // set loading and timer
    setLoading(true)
    setIsRunning(true)

    const source = axios.CancelToken.source();
    setCancelToken(source);

    // based on selector
    const max_tokens = selectedLength === 'longer' ? 1000 : 80;
    const preset = selectedLength === 'longer' ? 'longer' : 'shorter';

    // prepare request
    const endpoint = `${props.baseUrl}/semantic-qa`
    const req = {
      "doc_name": selectedDoc,
      "query": query,
      "max_tokens": max_tokens,
      "preset": preset,
    }

    // make request
    try {
      const res = await axios.post(endpoint, req, { cancelToken: source.token });
      const data = res.data;
      setResponseData(data);
    } catch (error) {
      // handle cancel
      if (axios.isCancel(error)) {
        return;
      } else {
        // handle error
        console.log(error);
      }
    } finally {
      // reset loading and timer
      setLoading(false)
      setIsRunning(false)
      setFlash('flash')

      // reset timer after 1 second
      setTimeout(() => {
        setElapsedTime(0)
      }, 1000)

      // reset cancel token
      setCancelToken(null);
    }
  }

  const cancelRequest = () => {
    cancelToken.cancel();
  };

  //! stopwatch -------------------------------------
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 0.01);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  //! Embed document API call -------------------------------------
  const [docForUpload, setDocForUpload] = useState(null);

  async function uploadDoc() {

    if (docForUpload === null) {
      setAlert("Please select a document to embed.");
      setAlertOpen(true);
      return;
    }

    setLoading(true)
    setIsRunning(true)

    const source = axios.CancelToken.source();
    setCancelToken(source);

    const endpoint = `${props.baseUrl}/docs/embed`;

    const tempFormData = new FormData();
    tempFormData.append('file', docForUpload);

    const res = await axios.post(endpoint, tempFormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      setResponseData(res.data);
    })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false)
        setIsRunning(false)
        setFlash('flash')

        // reset timer after 1 second
        setTimeout(() => {
          setElapsedTime(0)
        }
          , 1000)
      })

    setTimeout(() => {
      axios.get(`${props.baseUrl}/docs/sync`)
    }, 1000)

    // force refresh the page to trigger getServerSideProps and update the docs list
    router.replace(router.asPath)
  }

  // ! WEBSOCKET -------------------------------------
  function getResponseStream() {
    // handle errors
    if (selectedDoc === null) {
      setAlert("Please select a document. Can't answer your questions without a document.");
      setAlertOpen(true);
      return;
    }
    if (query === '') {
      setAlert("You have to enter a query. I'm not a mind reader.");
      setAlertOpen(true);
      return;
    }

    // reset response stream
    setResponseStream([]);
    setLoading(true);
    setLoadingStream(true);

    // set enpoint and message
    const baseWS = props.baseWS;
    const endpoint = `${baseWS}/semantic-qa/ws`
    const max_tokens = selectedLength === 'longer' ? 1000 : 80;
    const preset = selectedLength === 'longer' ? 'longer' : 'shorter';
    const message = {
      "doc_name": selectedDoc,
      "query": query,
      "max_tokens": max_tokens,
      "preset": preset,
    }

    // open socket, send message, and listen for response
    const socket = new WebSocket(endpoint);
    socket.onopen = () => {
      socket.send(JSON.stringify(message));
    };
    // handle response
    socket.onmessage = (event) => {
      // handle final object response, handle stream responses
      if (event.data.startsWith('{')) {
        const response_obj = JSON.parse(event.data)
        setResponseData(response_obj);
        setLoading(false);
        // console.log(responseData)
      } else {
        setLoadingStream(false);
        setResponseStream(prev => [...prev, event.data]);
      }
    }
    // handle socket close error
    socket.onclose = () => {
      setLoading(false);
      setLoadingStream(false);
    }
  }

  // ! GET DATA FROM S3 -------------------------------------
  // const folders = [
  //   { 'name': 'documents', 'content': ['learning about animals', 'jims dissertation', 'the history of the world', 'the history of the internet'] },
  //   { 'name': 'books', 'content': ['the great gatsby', 'the catcher in the rye'] },
  //   { 'name': 'articles', 'content': ['the history of the internet', 'the history of the world'] },
  //   { 'name': 'news', 'content': ['the latest news', 'the latest news', 'the newest news'] },
  // ]

  const folders = [
    {'name': 'documents', 'content': docs}
  ]

  // pass props to UI
  const pageProps = {
    docs,
    setSelectedDoc,
    selectedLength,
    setSelectedLength,
    query,
    setQuery,
    responseData,
    getResponse,
    loading,
    flash,
    elapsedTime,
    cancelRequest,
    docForUpload,
    setDocForUpload,
    uploadDoc,
    getResponseStream,
    responseStream,
    loadingStream,
    folders,
  }

  return (
    <Container>
      <AlertDialog
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        alert={alert}
      />
      {/* <UI {...pageProps} /> */}
      <UINew {...pageProps} />
    </Container>
  )
}

// get document list from API
export async function getServerSideProps(context) {
  const baseUrl = process.env.ENVIRONMENT === 'development' ? process.env.LOCAL_API_ENDPOINT : process.env.API_ENDPOINT;
  const baseWS = process.env.ENVIRONMENT === 'development' ? process.env.LOCAL_WS_ENDPOINT : process.env.WS_ENDPOINT;

  const list_endpoint = `${baseUrl}/docs/list`;

  console.log(list_endpoint)

  try {
    const res = await axios.get(list_endpoint);
    const data = res.data;
    console.log(`DATA:\n ${data}`);

    return {
      props: {
        data: data,
        baseUrl: baseUrl,
        baseWS: baseWS,
      },
    };
  } catch (error) {
    console.log(`ERROR:\n ${error}`);
    return {
      props: {
        data: null,
        baseUrl: baseUrl,
        baseWS: baseWS,
      },
    };
  }
}