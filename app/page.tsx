'use client'
import React, { useState } from 'react'
import Customers from '../data/customerLocations.json'
import Locations from '../data/plantationProjects.json'
import { useRouter } from 'next/navigation'
import { Button, Input, Container, Row, Col, Card, Grid, Badge, Text } from '@nextui-org/react'
import geoDistance from '@/utilities/geoDistance'
import { BsFillTreeFill } from 'react-icons/bs';
import { GoLocation } from 'react-icons/go';
import { GiPathDistance, GiCircleForest, GiPlantRoots } from 'react-icons/gi';
import Fuse from 'fuse.js'
import Link from 'next/link'



export default function Home() {
  const options = {
    includeScore: true,
    keys: ['name']

  }
  const fuse = new Fuse(Customers, options);
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState(null);

  const handleCustomerSelect = ({ target = {} }) => {
    const { value } = target;
    setQuery(value);
  };

  const customerResults = query ? fuse.search(query).map((item) => item.item) : Customers;
  const clearSelection = () => {
    setQuery('');
    setFilteredLocations(null)
  }
  const getResults = (item) => {
    setQuery(item.name);
    const results = geoDistance(Locations, item).slice(0, 3);
    setFilteredLocations(results);
  };

  return (
    <>
      <Container as="main" lg>
        <Row css={{
          marginTop: 30
        }}>
          <Col>
            <Input
              placeholder="Filter Location"
              value={query}
              onChange={handleCustomerSelect}
              onClearClick={() => clearSelection()}
              clearable
              autoComplete='on'
            />
          </Col>
        </Row>

        <Row
          css={{
            marginTop: 30
          }}
        >
          {/* display the customers locations */}
          <Col>
            <Grid.Container
              gap={2}
            >
              {customerResults?.map((customer, index) => (
                <Grid
                  key={index}
                  justify='center'
                  css={{
                    marginTop: 30
                  }}
                >
                  <Button
                    shadow
                    color="gradient"
                    bordered
                    onClick={() => getResults(customer)}
                  >
                    {customer.name}
                  </Button>
                </Grid>
              ))}
            </Grid.Container>
          </Col>

          {/* display the results */}
          <Col>
            <Grid.Container
              gap={2}
            >
              {filteredLocations?.map((location) => (
                <Grid
                  key={location.id}
                  xs={12}
                  justify='center'
                  css={{
                    marginTop: 30
                  }}
                >
                  <Link href={location.coordinatesUrl} title={location.projectName}>
                    <Card
                      variant="bordered"
                      isHoverable
                      isPressable
                      onPress={() => router.replace(location.coordinatesUrl)}
                      css={{
                        bgBlur: "$colors$white50",
                      }}
                    >
                      <Card.Header
                        css={{
                          fontSize: 18
                        }}
                      >
                        {location.projectName}
                        {location.status === 'planted' && (
                          <GiPlantRoots style={{
                            fontSize: 24,
                            marginLeft: '1ch',
                            marginRight: '1ch',
                            color: 'var(--nextui-colors-green600)'
                          }} />
                        )}
                        {` |  quantity: ${location.treeQuantity}`}
                      </Card.Header>
                      <Card.Divider />
                      <Card.Body>
                        <Text>{location.comment}</Text>
                      </Card.Body>
                      <Card.Footer>
                        <Badge>
                          <GoLocation style={{
                            marginRight: '1ch'
                          }} />
                          {location.location}
                        </Badge>
                        <Badge>
                          <GiCircleForest style={{
                            marginRight: '1ch'
                          }} />
                          {location.forestOwner}
                        </Badge>
                        <Badge>
                          <GiPathDistance style={{
                            marginRight: '1ch'
                          }} />
                          {`${location.distanceToStartingPoint} km`}
                        </Badge>
                      </Card.Footer>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid.Container>
          </Col>
        </Row>

      </Container>
    </>
  )
}
