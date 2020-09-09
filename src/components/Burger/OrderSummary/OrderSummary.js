import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {
    /** 
     * Questo potrebbe essere un functional component
     * in quando usiamo componentWillUpdate solo per controllare
     * che il componenti si aggiorna solo quando serve.
     * E controlliamo questo agg nel Modal.js
     */
    
    componentWillUpdate() {
        console.log('[OrderSummary] Will Update');
    }

    render() {

        console.log(this.props.ingredients);

        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}> 
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
            )
        })

        return (
            
            <Aux>
                <h3>Your order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <h2>Total Price: {this.props.price.toFixed(2)} $</h2>
                <p>Continue to Checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancelled}>Cancel</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinue}>Continue</Button>
            </Aux>
            )
    }
}

export default OrderSummary;