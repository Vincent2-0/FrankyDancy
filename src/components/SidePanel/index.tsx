import React from 'react'
import { Layout, Spin } from 'antd'
import { connect } from 'react-redux'
import _ from 'lodash'

import { RootState } from 'store/rootReducer'
import { getWrongPositionsCollection } from 'store/dance/selector'
import Stack, { Gutter } from 'components/Stack'
import Card from 'components/Card'
import { DancerProfile } from 'common/models'
import { Text, Title } from 'components/Typography'
import { RED } from 'common/colors'
import Avatar from 'components/Avatar'

const { Sider } = Layout

type Props = OwnProps & CombinedProps<typeof mapStateToProps, () => {}>

interface OwnProps {
  dancerProfiles: Dict<DancerProfile>
}

const SidePanel: React.FC<Props> = ({ dancerProfiles, wrongPositions }) => {
  const renderPositionGroup = (positions: number[]) => {
    return _.map(positions, (dancerNo) => (
      <Avatar
        width={48}
        src={_.get(
          dancerProfiles,
          [dancerNo, 'url'],
          'https://i.imgur.com/3MvrSRQ.jpg',
        )}
        alt={_.get(dancerProfiles, [dancerNo, 'name'], 'placeholder')}
      />
    ))
  }

  const renderWrongMovements = () => {
    return _.map(wrongPositions, (positionInfo) => {
      return (
        <Card>
          <Stack fillParentWidth vertical gutter={Gutter.SMALL}>
            <Stack gutter={Gutter.SMALL}>
              <Title>Time: {positionInfo.time} - </Title>
              <Title color={RED}>Wrong Position</Title>
            </Stack>
            <Stack alignItems="center" justifyContent="space-around">
              <Stack
                justifyContent="center"
                style={{ maxWidth: 100, minWidth: 100 }}
              >
                <Text>Expected:</Text>
              </Stack>
              <Stack center gutter={Gutter.EXTRA_SMALL}>
                {renderPositionGroup(
                  _.get(positionInfo, 'correctPosition', []),
                )}
              </Stack>
            </Stack>
            <Stack alignItems="center" justifyContent="space-around">
              <Stack
                justifyContent="center"
                style={{ maxWidth: 100, minWidth: 100 }}
              >
                <Text>Actual:</Text>
              </Stack>
              <Stack center gutter={Gutter.EXTRA_SMALL}>
                {renderPositionGroup(_.get(positionInfo, 'position', []))}
              </Stack>
            </Stack>
          </Stack>
        </Card>
      )
    })
  }

  const renderLoader = () => {
    return (
      <Stack
        vertical
        fillParentHeight
        center
        style={{ margin: 30, textAlign: 'center' }}
      >
        <Spin size="large" />
        <Text>Mistakes made during a dance will be shown here</Text>
      </Stack>
    )
  }

  return (
    <Sider style={{ background: '#f6f8ff', overflowY: 'auto' }} width={400}>
      <Stack
        fillParentHeight
        style={{ padding: 20 }}
        vertical
        gutter={Gutter.REGULAR}
      >
        {_.isEmpty(wrongPositions) ? renderLoader() : renderWrongMovements()}
      </Stack>
    </Sider>
  )
}

const mapStateToProps = (s: RootState) => ({
  wrongPositions: getWrongPositionsCollection(s),
})

export default connect(mapStateToProps)(SidePanel)
