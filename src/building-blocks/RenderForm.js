import React from 'react';
import { Field, reduxForm } from 'redux-form'
import store from '../store'
import {Provider } from 'react-redux'

const eachComponent = ({ input, label, type, value, placeholder,  meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input className='form-control' {...input}  placeholder={placeholder}  type={type}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

class RenderForm extends React.Component {

  render() {
    let {options} = this.props;
    let handleSubmit = options.handleSubmit;
    let fields = options.fields;
    let RenderFieldWrapped = () => (
      <div>  <form onSubmit={handleSubmit} >
        {fields.map(op => (
          <div key={op.name}>
              <Field name={op.name} onChange={op.onChangeFun} component={eachComponent}
                            type="input" placeholder={op.placeholder} label={op.name}/>
          </div>
      ))
    }
  < input className="btn btn-primary"  type = "submit"  value = "Submit" / >
     </form>
     </div>)


    let RenderFieldWrappedInstance = reduxForm({
      form: 'RenderFieldWrapped'
    })(RenderFieldWrapped);

    return (
      <div>
        <Provider store={store}>
          <RenderFieldWrappedInstance options={options} />
        </Provider>
      </div>
    )
  }
}
export default RenderForm
