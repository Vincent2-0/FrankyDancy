import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { RootState } from 'store/rootReducer'
import { getUsers } from 'store/user/selectors'
import { groupActiveDancersByUserId } from 'store/dance/selector'
import Logo from 'components/Logo'
import Stack from 'components/Stack'

import UserList from './UserList'

type Props = CombinedProps<typeof mapStateToProps, typeof mapDispatchToProps>

const Home: React.FC<Props> = ({ users, activeDancers }) => {
  const load = () => {}

  React.useEffect(load, [])

  /**
   * @todo: display a list of users + their status
   * @todo: redux: start dance, check active, go to curr session, fetch user info,
   * @todo: notify when theres an ongoing session -> go to analytics page
   */
  // LAYOUT
  return (
    <Stack center vertical>
      <Logo />
      <UserList users={users} activeDancers={activeDancers} />
    </Stack>
  )
}

const mapStateToProps = (s: RootState) => ({
  users: getUsers(s),
  activeDancers: groupActiveDancersByUserId(s),
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
