import React, {Component} from 'react';
import './App.css';


class App extends Component {

    constructor() {
        super()
        this.state = {loading: true}
    }

    async componentDidMount() {
        const data = await this.props.ytClient.search('pupek wakeup')
        console.log(data)
        this.setState({data: data.data, loading: false})
    }

    render() {

        const {state} = this
        const {loading} = state;

        if (loading) {
            return <div>Loading...</div>
        }


        const {items} = state.data.youtubeV3.search.list

        return (
            <div className="App">
                {items.map(item => <div key={item.id.videoId}>
                    <img  src={`https://img.youtube.com/vi/${item.id.videoId}/hqdefault.jpg`}/>
                </div>)}
            </div>
        );
    }
}


export default App

