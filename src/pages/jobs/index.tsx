import Head from "next/head"
import Jumbotron from "react-bootstrap/Jumbotron"
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import Badge from "react-bootstrap/Badge"
import NextLink from "next/link"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"
import { useQuery } from "react-query"
import { GetServerSideProps } from "next"
import { Fragment } from "react"
import { useRouter } from "next/router"

import Layout from "components/Layout"
import Alert from "components/Alert"
import graphql from "graphql/api"
import GET_JOBS from "graphql/query/GET_JOBS"
import { useForm } from "react-hook-form"

interface JobIndexProps {
  tech?: string
  location?: string
  page: number
  jobs: {
    id: string 
    title: string 
    tags: string[]
    location: string
    company: string 
  }[]
}

interface JobIndexParams {
  page?: number 
  tech?: string 
  location?: string
}

const JobIndex: React.FC<JobIndexProps> = ({ jobs, page, tech, location }) => {
  const router = useRouter()
  const { handleSubmit, register } = useForm<JobIndexParams>()
  
  const onSubmit = handleSubmit(async data => {
    if (data) {
      const search = new URLSearchParams()

      data.location && search.append('location', data.location)
      data.tech && search.append('tech', data.tech)

      router.push(`/jobs?${search.toString()}`)
    }
  })

  const { data, error, isLoading } = useQuery(
    ['jobs', tech, location], 
    async () => {
      const data = await graphql.request(GET_JOBS, { tech, location })
      
      return data.jobs as JobIndexProps
    }, {
      initialData: { page, jobs }
    }
  )

  return (
    <Layout>
      <Head>
        <title>Vagas {tech ? `de ${tech}` : undefined} | DevHunter</title>
      </Head>
      <Jumbotron>
        <Container>
          <h1>Vagas Disponíveis</h1>
        </Container>
      </Jumbotron>
      <Container>
        { isLoading ? (
          <Spinner animation="border" variant="dark" />
        ) : (error || !jobs ? (
          <Alert 
            color="danger"
            heading="Ops, não foi possível acessar as vagas"
            body="Tente novamente mais tarde"
          />
        ) : (
          <Row>
            <Col sm={3}>
              <Form onSubmit={onSubmit}>
                <Form.Control 
                  placeholder="Tecnologia (Ex: Java)" 
                  ref={register} 
                  name="tech"
                />
                <Form.Control 
                  placeholder="Localização" 
                  ref={register}
                  name="location" 
                />
                <Button type="submit" variant="primary">Filtrar</Button>
              </Form>
            </Col>
            <Col sm={9}>
              <ListGroup>
                {data.jobs.map(job => (
                  <ListGroup.Item key={job.id}>
                    <NextLink href="/jobs/[id]" as={`/jobs/${job.id}`}>
                      <h2 style={{ cursor: 'pointer'}}>{job.title}</h2>
                    </NextLink>
                    <span>na {job.company}</span>
                    <span>{job.location}</span>
                    <div>
                      {job.tags.map(tag => (
                        <Fragment key={tag}>
                          <Badge variant="primary" key={tag}>
                            {tag}
                          </Badge>
                          {' '}
                        </Fragment>
                      ))}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        ))}
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { location, tech } = query as JobIndexParams
    const data = await graphql.request(GET_JOBS, { location, tech })
    const { jobs, page } = data.jobs as JobIndexProps

    return {
      props: {
        tech: tech || null,
        location: location || null,
        page,
        jobs
      }
    }
  } catch (error) {
    return {
      props: {
        page: 0,
        jobs: null
      }
    }
  }
}

export default JobIndex