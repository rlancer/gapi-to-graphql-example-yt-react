import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import YouTubeAPI from 'gapi-to-graphql/google_apis/youtube-v3'
import * as gqlmod from 'graphql'
import gapiToGraphQL from 'gapi-to-graphql'

console.log(process.env)

const {graphql, GraphQLSchema, GraphQLObjectType} = gqlmod

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {...gapiToGraphQL({gapiAsJsonSchema: YouTubeAPI, graphQLModule: gqlmod})}
    })
})


const ytClient = {
    search: (q) =>
        graphql(schema, `{
              youtubeV3(key: "${process.env.REACT_APP_YT_APIKEY}") {
                search {
                  list(q: "${q}", part: "snippet") {
                    items {
                      id {
                        videoId
                      }
                      snippet{
                        title
                      }
                    }
                  }
                }
              }
            }`)

}

ReactDOM.render(
    <App ytClient={ytClient}/>
    , document.getElementById('root'));
registerServiceWorker();


