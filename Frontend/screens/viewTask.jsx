import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { viewTask } from '../Redux/Action';

const  viewTask = () => {
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(viewTask())
    },[dispatch])
  return (
    <View style={homeContainerStyle.homeContainer}>
        <ScrollView>
          <SafeAreaView>
            <Text style={homeContainerStyle.textViewHeading}>All Requests</Text>
            </SafeAreaView>
        </ScrollView>
      </View>
  );
};

export default  viewTask