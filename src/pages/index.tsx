import Head from 'next/head'
import NextLink from "next/link"
import Image from "next/image"
import Jumbotron from "react-bootstrap/Jumbotron"
import Button from "react-bootstrap/Button"
import Container from 'react-bootstrap/Container'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import Layout from "components/Layout"

export default function Home() {
  return (
    <div>
      <Head>
        <title>DevHunter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Jumbotron >
          <Container>
            <Row>
              <Col sm={7}>
                <h1>Bem vindo ao DevHunter</h1>
                <p>Encontre vagas de trabalho para developers</p>
                <NextLink href="/jobs">
                  <Button size="lg">
                    Vagas Disponíveis
                  </Button>
                </NextLink>
              </Col>
              <Col sm={5}>
                <Image 
                  src="/images/undraw_career_progress.svg" 
                  width={400} 
                  height={320}
                />
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </Layout>
    </div>
  )
}
