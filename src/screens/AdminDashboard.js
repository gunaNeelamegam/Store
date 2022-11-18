import React from 'react'

import { connect } from "react-redux"
import { FAB, Portal, Provider } from 'react-native-paper';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';





const AdminDashboard = ({ navigation }) => {


  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;




  return (<Provider>
    <Portal>
      <FAB.Group

        color='#6A1B4D'
        fabStyle={{
          backgroundColor: "#FFf"
        }}
        style={{
          backgroundColor: "#fff"
        }}
        open={open}
        visible
        icon={open ? 'calendar-today' : ({ ...props }) => (<MaterialIcons name="admin-panel-settings" {...props} size={24} color="black" />)}
        actions={[
          { icon: 'plus', onPress: () => console.log('Pressed add') },
          {
            icon: ({ ...props }) => (<FontAwesome name="users" size={24} {...props} color="black" />),
            label: 'All User\'s',
            onPress: () => console.log('open all Users'),
            labelTextColor: "#6A1B4D"
          },
          {
            icon: ({ ...props }) => (<MaterialCommunityIcons name="human-male-height" size={24} {...props} color="black" />),
            label: 'All Manager\'s',
            onPress: () => console.log('Pressed email'),
            labelTextColor: "#6A1B4D"
          },
          {
            icon: ({ ...props }) => (<Ionicons {...props} name="create-outline" size={24} color="black" />),
            label: 'create product',
            onPress: () => console.log('Pressed notifications'),
            labelTextColor: "#6A1B4D"
          },
          {
            icon: ({ ...props }) => (<FontAwesome name="group" size={24} color="black" />),
            label: "Create New Product",
            onPress: (() => navigation.navigate("CreateProduct")),
            labelTextColor: "#6A1B4D"
          }, {
            icon: ({ ...props }) => (<FontAwesome name="recycle" size={24} color="black" />),
            label: "All User's",
            onPress: (() => navigation.navigate("AllUsers")),
            labelTextColor: "#6A1B4D"
          },

        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  </Provider>
  )
}

// AdminDashboard.propTypes = {
//   authState: propTypes.object.isRequired
// }

const mapStateToProps = (state) => ({
  authState: (state) => state.auth
})

export default connect(mapStateToProps, null)(AdminDashboard)