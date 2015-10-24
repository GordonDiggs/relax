import cloneDeep from 'lodash.clonedeep';
import React, {PropTypes} from 'react';
import {Component} from 'relax-framework';

import OptionsList from '../../../../options-list';
import {Types} from '../../../../../data-types';

export default class AnimationTab extends Component {
  static propTypes = {
    pageBuilder: PropTypes.object.isRequired,
    pageBuilderActions: PropTypes.object.isRequired
  }
  static defaults = {
    use: false,
    effect: 'transition.fadeIn',
    duration: 400,
    delay: 300
  }

  static options = [
    {
      label: 'Animation',
      type: 'Optional',
      id: 'use',
      unlocks: [
        {
          label: 'Effect',
          type: Types.Select,
          id: 'effect',
          props: {
            labels: [
              'Fade',
              'Flip X',
              'Flip Y',
              'Whirl',
              'Shrink',
              'Expand',
              'Slide up',
              'Slide down',
              'Slide left',
              'Slide right',
              'Slide big up',
              'Slide big down',
              'Slide big left',
              'Slide big right'
            ],
            values: [
              'transition.fadeIn',
              'transition.flipXIn',
              'transition.flipYIn',
              'transition.whirlIn',
              'transition.shrinkIn',
              'transition.expandIn',
              'transition.slideUpIn',
              'transition.slideDownIn',
              'transition.slideLeftIn',
              'transition.slideRightIn',
              'transition.slideUpBigIn',
              'transition.slideDownBigIn',
              'transition.slideLeftBigIn',
              'transition.slideRightBigIn'
            ]
          }
        },
        {
          label: 'Duration',
          type: Types.Number,
          id: 'duration',
          props: {
            min: 0,
            max: 20000,
            label: 'ms'
          }
        },
        {
          label: 'Delay',
          type: Types.Number,
          id: 'delay',
          props: {
            min: 0,
            max: 20000,
            label: 'ms'
          }
        }
      ]
    }
  ]

  onChange (id, value) {
    const {selected} = this.props.pageBuilder;
    const {changeElementAnimation} = this.props.pageBuilderActions;
    changeElementAnimation(selected.id, id, value);
  }

  playAnimations (event) {
    event.preventDefault();
    window.dispatchEvent(new Event('animateElements'));
  }

  render () {
    return (
      <div className='advanced-menu-animation'>
        {this.renderContent()}
        <a href='#' onClick={this.playAnimations.bind(this)} className='button full button-primary'>Play animations</a>
      </div>
    );
  }

  renderContent () {
    const {selected} = this.props.pageBuilder;
    let result;
    if (selected) {
      const values =  selected.animation || AnimationTab.defaults;
      result = (
        <OptionsList options={AnimationTab.options} onChange={this.onChange.bind(this)} values={values} />
      );
    } else {
      result = (
        <p>You need select an element first</p>
      );
    }
    return result;
  }
}