import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { Card, Button, Dropdown } from 'react-bootstrap'

import { getAllProduct, getProductChips, getProductChoco, getProductDrink, getProdutCandy, getProductAscend, getProductDescend } from '../action'

class Products extends React.Component {

    componentDidMount() {
        this.props.getAllProduct()
    }

    renderCard = () => {
        return this.props.product.map((item) => {
            return (
                <Card key={item} style={{ width: '18rem', marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
                    <Card.Img variant="top" src={item.image} style={{}} />
                    <Card.Body style={styles.cardBody}>
                        <Card.Title style={{}}>{item.product_name}</Card.Title>
                        <Card.Text style={{}}>{item.price_sell}</Card.Text>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            
                            <Button variant="primary" as={Link} to={`/detail?id=${item.id_product}`}>Buy</Button>
                        </div>
                    </Card.Body>
                </Card>
            )
        })
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Product Filter
                </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.props.getAllProduct()} >All Product</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.props.getProductChips()}>Chips Product</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.props.getProductChoco()}>Chocolate Product</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.props.getProductDrink()}>Soft Drink Product</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.props.getProdutCandy()}>Chocolate Product</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    {this.renderCard()}
                </div>
            </div>
        )
    }
}

const styles = {
    cardBody: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }
}

//global state
const mapStateToProps = (state) =>{
    return {
        product: state.product.product
    }
}

//export component
export default connect(mapStateToProps,{getAllProduct,getProductChips,getProductChoco,getProductDrink,getProdutCandy})(Products)