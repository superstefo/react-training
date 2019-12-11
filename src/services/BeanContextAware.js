import React from 'react';

class BeanContextAware extends React.Component {

  constructor(props) {
    super(props);
    this.context= {};
  };

  add = (bean) => {
    if (!bean || !bean.state) {
      throw new Error("Not allowed 'null' values for 'bean': " + bean + " !");
    }
    let beanId = bean.state.beanId || bean.props.beanId;
    if (!beanId) {
      throw new Error("Not allowed 'null' value for 'beanId' " + beanId  + " !" );
    }
    if (this.context[beanId]) {
      console.warn("Bean with 'beanId': " + beanId + "is already registered under BeanContextAware!");
    }
    this.context[beanId] = bean;
  }

  get = (beanId) => {
    if (!beanId ) {
      throw new Error("Not allowed 'null' value for 'beanId' " + beanId + " !" );
    }
    return this.context[beanId];
  }

  remove = (bean) => {
    if (!bean) {
      throw new Error("Not allowed 'null' value for 'bean' " + bean + " !" );
    }
    if ( typeof bean === 'string' ) {
        delete this.context[bean];
        return;
    }
    let beanId = bean.state.beanId || bean.props.beanId;
    delete this.context[beanId];
  }
}
export default new BeanContextAware();
