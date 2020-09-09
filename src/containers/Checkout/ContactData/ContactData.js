import React, { Component } from 'react';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: '',
                validation: {},
                valid: true
            },
        },
        formIsValid: false,
        loading: false,
    }

    orderHandler = (event) => {
        // Previene il comportamento di default che manda la richiesta e aggiorna la pagina
        event.preventDefault();
        
        const formData = {};
        
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier]
        }

        this.setState({loading: true})

        // let price = this.props.price
        // let priceFixed = parseFloat(price)
        // Impostiamo l'ordine
        const order = {
            ingredients: this.props.ingredients,
            price: parseFloat(this.props.price),
            orderData: formData
            
        }

        console.log(order);

        /** 
         * Postiamo nel server l'ordine appena creato in formato JSON, storato su Firebase
         * Il primo parametro è la posizione (percorso) nel nostro database,
         * il secondo parametro è il nostro ordine.
         * 
         */ 

        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error)
                this.setState({loading: false});
            });

        console.log(this.props.ingredients);
    }

    checkValidity (value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid === true;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid === true;
        }
        
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid === true;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        console.log(event.target.value);

        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)

        updatedFormElement.touched = true;

        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        
        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        console.log(updatedFormElement);
        console.log(formIsValid);

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});

    }

    render () {

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>

                {
                    formElementsArray.map(formElement => {
        
                    return (
                        
                                 <Input
                                     key={formElement.id} 
                                     elementType={formElement.config.elementType} 
                                     elementConfig={formElement.config.elementConfig} 
                                     value={formElement.config.value}
                                     invalid={!formElement.config.valid} 
                                     shouldValidate={formElement.config.validation}
                                     touched={formElement.config.touched}
                                     changed={(event) => this.inputChangedHandler(event, formElement.id)} 
                                     />
                        
                        )       
                    })
                }                

                

                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>

            </form>
        );

        if(this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;