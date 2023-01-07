import Container from '../components/Container'
import UI from '../components/UI'

export default function Home() {
  return (
    <Container>
      <h1 className='text-black dark:text-white md:text-5xl font-bold mb-8'>Semantic Search</h1>
      <UI/>
    </Container>
  )
}