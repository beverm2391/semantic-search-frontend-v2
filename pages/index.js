import Container from '../components/Container'
import UI from '../components/UI'
import axios from 'axios'
import { useState, useEffect } from 'react'
import AlertDialog from '../components/AlertDialog'

export default function Index(props) {
  // document list
  const docs = props.data['docs'];
  // data states
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [selectedLength, setSelectedLength] = useState('longer');
  const [query, setQuery] = useState('');
  const [responseData, setResponseData] = useState(null);
  // loading states
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState('')
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [cancelToken, setCancelToken] = useState(null);
  // ui states
  const [alertOpen, setAlertOpen] = useState(false);
  const [alert, setAlert] = useState('');

  // make a request to the API
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

    // prepare request
    const endpoint = `${props.baseUrl}/semantic-qa`
    console.log(endpoint)
    const req = {
      "doc_name": selectedDoc,
      "query": query,
      //! "model": selectedLength === 'longer' ? "text-davinci-003" : "text-davinci-002"
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

  // stopwatch
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 0.01);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

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