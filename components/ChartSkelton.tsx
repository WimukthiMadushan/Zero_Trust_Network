import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Box, Card, Flex, Skeleton } from '@radix-ui/themes'
import React from 'react'

const ChartSkelton = () => {
  return (
    <Card className="w-full max-w-xl p-4 mx-auto">
      <CardHeader>
        <Flex align="center" justify="between">
          <Box>
            <CardTitle><Skeleton width='1.5rem'/></CardTitle>
          </Box>
        </Flex>
      </CardHeader>
          <CardContent>
              <Box>
                  <Skeleton height='2rem' width='5rem'/>
              </Box>
      </CardContent>
    </Card>
  )
}

export default ChartSkelton