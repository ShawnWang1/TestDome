/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class Setup extends Component<{}> {
  constructor(props) {
    super(props);

    this.state = {
      movies:new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false
    };

    this.fetchData();
  }

  fetchData() {
    fetch('https://api.douban.com/v2/movie/top250')
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        movies: this.state.movies.cloneWithRows(responseData.subjects),
        loaded: true
      });
    })
    .done();
  }

  renderMovieList(movie){
    return (
      <View style={styles.item}>
        <View style={styles.itemImage}>
          <Image 
          source={{uri: movie.images.large}}
          style={styles.image}
          />
        </View>
        <View style={styles.itemConten}>
          <Text style={styles.itemHeader}>{movie.title}</Text>
          <Text style={styles.itemMeta}>
            {movie.original_title} ( {movie.year} )
          </Text>
          <Text style={styles.redText}>
            {movie.rating.average}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return (
        <View style={styles.container}>
          <View style={styles.loading}>
            <Text>加载中...</Text>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.movies}
          renderRow={this.renderMovieList}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    maxWidth: 200,
    width: 99,
    height: 138,
    margin: 6,
  },
  // itemImage: {
  //   flex: 1,
  //   maxWidth: 200,
  //   width: 99,
  //   height: 138,
  //   margin: 6,
  // },
  item: { 
    borderColor: 'rgba(100,53,201,0.1)',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingBottom: 6,
    marginBottom: 6,
  },
  itemConten: {
    flex: 1,
    marginLeft: 13,
    marginTop: 6,
  },
  itemHeader: {
    fontSize: 18,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    color: '#6435c9',
    marginBottom: 6,
  },
  itemMeta: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 6,
  },
  redText: {
    fontSize: 15,
    color: '#db2828',
  },
  itemText: {
    fontSize: 33,
    fontFamily: 'Helvetica Neue',
    fontWeight: '200',
    color: '#6435c9',
    padding: 30,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#eae7ff',
    paddingTop:23,
  },
  
});
