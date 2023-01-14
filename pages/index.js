import Container from '../components/Container'
import UI from '../components/UI'
import axios from 'axios'
import { useState, useEffect } from 'react'
import AlertDialog from '../components/AlertDialog'
import { useRouter } from 'next/router';

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
  const [flash, setFlash] = useState('')
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [cancelToken, setCancelToken] = useState(null);
  // ui states
  const [alertOpen, setAlertOpen] = useState(false);
  const [alert, setAlert] = useState('');


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
    // reset response stream
    setResponseStream([])
    // set enpoint and message
    const endpoint = 'ws://127.0.0.1:8000/test/ws'
    const message = {
      "text": query,
    }
    // open socket, send message, and listen for response
    const socket = new WebSocket(endpoint);
    socket.onopen = () => {
      socket.send(JSON.stringify(message));
    };
    // handle response
    socket.onmessage = (event) => {
      setResponseStream(prev => [...prev, event.data]);
    }
  }

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
    responseStream
  }

  return (
    <Container>
      <AlertDialog
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        alert={alert}
      />
      <UI {...pageProps} />
    </Container>
  )
}

// get document list from API
export async function getServerSideProps(context) {
  const baseUrl = process.env.API_ENDPOINT;
  const endpoint = `${baseUrl}/docs/list`;

  try {
    const res = await axios.get(endpoint);
    const data = res.data;
    console.log(data);

    return {
      props: {
        data: data,
        baseUrl: baseUrl,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: null,
        baseUrl: baseUrl,
      },
    };
  }
}