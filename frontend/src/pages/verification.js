import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

import {
    Button
} from 'react-bootstrap'

class Verification extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            verified: false
        }
    }

    async componentDidMount () {
        const token= this.props.location.search.substring(1)
        console.log(token)
       
        try {
            const res= await Axios.post('http://localhost:2000/user/verification', {token})

            console.log(res.data)

            // this.setState({ verified: true })
            this.setState({verified : true})

        }
        catch(err) {
            console.log(err)
        }
    }

    render () {
        

        return (
            <div style={{ paddingTop : '50px'}}>
                {
                    this.state.verified ?
                    <Link to='/'>
                        <Button >
                            Go To Home
                        </Button>
                    </Link>
                    :
                    <h1>Loading...</h1>
                }
            </div>
        )
    }
}



export default Verification