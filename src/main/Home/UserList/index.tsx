import React from 'react'
import { List } from 'antd'
import styled from 'styled-components'
import _ from 'lodash'

import { Dancer, User } from 'common/models'
import Stack, { Gutter } from 'components/Stack'
import Card from 'components/Card'
import Avatar from 'components/Avatar'
import { Text } from 'components/Typography'
import { RED, GREEN } from 'common/colors'

interface Props {
  users: Dict<User>
  activeDancers: Dict<Dancer>
}

const UserList: React.FC<Props> = ({ users, activeDancers }) => {
  const renderUserStatus = (userId: string) => {
    if (activeDancers[userId]) {
      return (
        <Text fontWeight="bold" color={GREEN}>
          Active
        </Text>
      )
    }
    return (
      <Text fontWeight="bold" color={RED}>
        Idle
      </Text>
    )
  }

  return (
    <UserListCard>
      <List
        dataSource={_.values(users)}
        renderItem={(user) => (
          <List.Item key={user._id}>
            <Stack
              fillParentWidth
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack center gutter={Gutter.REGULAR}>
                <Avatar width={32} src={user.url} alt={user.name} />
                <Text>{user.name}</Text>
              </Stack>
              {renderUserStatus(user._id)}
            </Stack>
          </List.Item>
        )}
      />
    </UserListCard>
  )
}

const UserListCard = styled(Card)`
  min-width: 400px;
`

export default UserList
