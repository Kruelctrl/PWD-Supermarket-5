import React from 'react'
import { Link } from 'react-router-dom'

import {
    Button
} from 'react-bootstrap'

class Home extends React.Component {
    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h1>This is Home</h1>
                <Button variant="primary" as={Link} to='/cartPage'>Go to Cart</Button>
            </div>
        )
    }
}

export default Home