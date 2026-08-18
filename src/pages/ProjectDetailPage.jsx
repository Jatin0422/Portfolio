import { useParams, Link } from 'react-router-dom'
import CaseStudy from '../components/case-study/CaseStudy'

export default function ProjectDetailPage() {
  const { id } = useParams()

  return (
    <div>
      <Link to="/">Back to Home</Link>
      <h1>Project: {id}</h1>
      <CaseStudy />
    </div>
  )
}
