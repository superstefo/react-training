import React from 'react';
import uuidv1 from 'uuid/v1';
import { Field, reduxForm } from 'redux-form'
import store from '../store'
import { Provider } from 'react-redux'

const eachComponent = ({ input, label, type, value, placeholder, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input className='form-control' {...input} placeholder={placeholder} type={type} />
      {touched && error && <span>{error}</span>}
      <p />
    </div>
  </div>
)
let randomizeName = (obj) => {
  if (obj.noCash) { // prevent auto-suggest
    obj.name = uuidv1();
  }
}
class RenderForm extends React.Component {

  render() {
    let { options } = this.props;
    let handleSubmit = options.handleSubmit;
    let fields = options.fields;

    let RenderFieldWrapped = () => (
      <div>
        <form onSubmit={handleSubmit} >
          {
            fields.map(op => {
              randomizeName(op)
              return <div key={op.name}>
                <Field name={op.name} onChange={op.onChange} component={eachComponent}
                  type="input" placeholder={op.placeholder} label={op.label} />
                <p />
              </div>
            })
          }
          < input className="btn btn-primary" type="submit" value="Submit" />
        </form>
      </div>
    )


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
