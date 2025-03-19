import { Box, Callout, Card, Flex, Skeleton } from '@radix-ui/themes'
import React from 'react'

const boxSkelton = () => {
  return (
    <Box maxWidth="50rem" className="mx-auto mt-5">
      <Card className="p-6 flex justify-center shadow-lg rounded-lg">
        <Box>
          <Skeleton/>

          <Callout.Root>
            <Flex gapX="2">
              <Callout.Icon>
                <Skeleton/>
              </Callout.Icon>
              <Callout.Text><Skeleton/></Callout.Text>
            </Flex>
            <Flex align="center" justify="start" className="mt-4 text-sm ml-1" gapX="2">
              <Skeleton/>
              <Skeleton/>
            </Flex>
          </Callout.Root>
        </Box>
      </Card>
    </Box>
  )
}

export default boxSkelton