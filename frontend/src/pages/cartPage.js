import React from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { login } from '../actions'

import {
    Table,
    Button,
    Image,
    Form
} from 'react-bootstrap'

class CartPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: null,
            newQty: 0
        }
    }

    handleDelete = (index) => {
        // console.log(index)
        let tempCart = this.props.cart
        // syntax splice untuk menghapus
        tempCart.splice(index, 1)
        console.log(tempCart)

        Axios.post(`http://localhost:2000/getCart/deleteCartProduct/${id_order}`, { cart: tempCart })
            .then((res) => {
                console.log(res.data)

                Axios.get(`http://localhost:2000/getCart/cartProduct/${this.props.id}`)
                    .then((res) => this.props.login(res.data))
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }

    handleMinus = () => {
        if (this.state.newQty <= 0) return

        this.setState({ newQty: this.state.newQty - 1 })
    }

    changeQty = (e) => {
        this.setState({ newQty: e.target.value })
    }

    handleDone = (index) => {
        // mengganti data pesanan suatu produk berdasarkan index
        // tempProduct adalah tempat penyimpanan sementara data product yang ingin diedit
        let tempProduct = this.props.cart[index]
        // mengganti data cart untuk product yang ingin diganti
        tempProduct.qty = parseInt(this.state.newQty)
        tempProduct.total = this.state.newQty * this.props.cart[index].price
        console.log(tempProduct)

        // memasukan object pesanan product yang baru, ke dalam array cart
        // tempCart adalah tempat penampungan sementara data cart user yang lama
        let tempCart = this.props.cart
        // syntax splice untuk mereplace
        tempCart.splice(index, 1, tempProduct)
        console.log(tempCart)

        // mengirim perubahan ke database json
        Axios.patch(`http://localhost:2000/getCart/cartProduct/${this.props.id}`, { cart: tempCart })
            .then((res) => {
                console.log(res.data)

                // update data di redux
                Axios.get(`http://localhost:2000/getCart/cartProduct/${this.props.id}`)
                    .then((res) => {
                        this.props.login(res.data)
                        this.setState({ selectedIndex: null})
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }

    renderTHead = () => {
        return (
            <thead style={{ textAlign: "center" }}>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
        )
    }

    renderTBody = () => {
        return (
            <tbody>
                {this.props.cart.map((item, index) => {
                    if (this.state.selectedIndex === index) {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.product_name}</td>
                                <td style={{ textAlign: "center" }}>
                                    <Image style={{ width: 100, height: 100 }} src={item.image} rounded />
                                </td>
                                <td style={{ textAlign: "center" }}>IDR {item.price_sell.toLocaleString()}</td>
                                <td style={{}}>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button onClick={this.handleMinus}>
                                            <i className="fas fa-minus"></i>
                                        </Button>
                                        <Form.Control style={{ width: '100px' }} onChange={(e) => this.changeQty(e)} value={this.state.newQty} min={0} />
                                        <Button onClick={() => this.setState({ newQty: parseInt(this.state.newQty) + 1 })}>
                                            <i className="fas fa-plus"></i>
                                        </Button>
                                    </div>
                                </td>
                                <td>{item.status}</td>
                                <td style={{ textAlign: "center" }}>IDR {(this.state.newQty * item.price_sell).toLocaleString()}</td>
                                <td style={{ textAlign: "center" }}>
                                    <Button variant='success' onClick={() => this.handleDone(index)} style={{ marginRight: '15px' }}>Done</Button>
                                    <Button variant='danger' onClick={() => this.setState({ selectedIndex: null })}>Cancel</Button>
                                </td>
                            </tr>
                            
                        )
                    }
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td style={{ textAlign: "center" }}>
                                <Image style={{ width: 100, height: 100 }} src={item.image} rounded />
                            </td>
                            <td style={{ textAlign: "center" }}>IDR {item.price_sell.toLocaleString()}</td>
                            <td style={{ textAlign: "center" }}>{item.quantity}</td>
                            <td style={{ textAlign: "center" }}>IDR {item.total.toLocaleString()}</td>
                            <td style={{ textAlign: "center" }}>{item.status}</td>
                            <td style={{ textAlign: "center" }}>
                                <Button variant='warning' onClick={() => this.setState({ selectedIndex: index, newQty: item.qty })} style={{ marginRight: '15px' }}>Edit</Button>
                                <Button variant='danger' onClick={() => this.handleDelete(index)}>Delete</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        )
    }

    render() {
        if(!this.props.id) return <Redirect to='/login'/>
        
        // console.log(this.props.cart)
        // console.log(this.state.selectedIndex)
        // console.log(this.state.newQty)
        return (
            <div style={{ marginTop: '70px', padding: '0 15px' }}>
                <h1>Ini Cart Page</h1>
                <Table striped bordered hover variant="dark">
                    {this.renderTHead()}
                    {this.renderTBody()}
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.user.cart,
        id: state.user.id
    }
}

export default connect(mapStateToProps, { login })(CartPage)