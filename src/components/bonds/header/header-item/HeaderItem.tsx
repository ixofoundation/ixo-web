import React, { Component } from 'react'
import './HeaderItem.scss'

export default class HeaderItem extends Component<any> {
  render() {
    return (
      <div className="Bonds_header__item">
        {this.props.tokenType ? (
          <div className="Bonds_header__item_token">{this.props.tokenType}</div>
        ) : null}

        <div className="Bonds_header__item_value_container">
          <div className="Bonds_header__item_title">{this.props.title}</div>

          <div className="Bonds_header__item_value">
            {this.props.tokenType ? this.props.value : '0%'}
          </div>

          <div className="Bonds_header__item_local_value">
            {this.props.value}
            {this.props.tokenType ? '' : '%'}
          </div>
        </div>
      </div>
    )
  }
}