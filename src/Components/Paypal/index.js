import React from 'react';
import PayPalButton from './Paypal.js'


class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { functionSave } = this.props;
        const { fee } = this.props
        console.log('update date functionsave',functionSave)
    }

    render(){            
        return (
            <div>
                <PayPalButton {...this.props} />
            </div>
        )
    }
}

export default App;
