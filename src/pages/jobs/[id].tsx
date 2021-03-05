import { GetServerSideProps } from "next"
import Container from "react-bootstrap/Container"
import Jumbotron from "react-bootstrap/Jumbotron"
import Breadcrumb from "components/Breadcrumb"
import marked from "marked"

import Layout from "components/Layout"
import graphql from "graphql/api"
import SHOW_JOB from "graphql/query/SHOW_JOB"
import Head from "next/head"

interface JobDetailsProps {
  job: {
    id: string 
    title: string 
    tags: string[]
    location: string
    company: string 
    description: string
  }
}

const JobDetails: React.FC<JobDetailsProps> = ({ job }) => {
  return (
    <Layout>
      <Head>
        <title>{job.title} | DevHunter</title>
      </Head>
      <Jumbotron>
        <Container>
          <h1>{job.title}</h1>
        </Container>
      </Jumbotron>
      <Container>
        <Breadcrumb 
          items={[
            { name: 'Home', url: '/' },
            { name: 'Vagas', url: '/jobs' },
            { name: job.title, url: `/jobs/${job.id}` }
          ]} 
        />
        <p dangerouslySetInnerHTML={{ __html: job.description }}></p>
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query
  const data = await graphql.request(SHOW_JOB, { id })

  return {
    props: {
      job: {
        ...data.job,
        description: marked(data.job.description)
      }
    }
  }
}

export default JobDetails