import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import 'rc-calendar/assets/index.css';
import './css/date-picker.css';

import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';

import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';


const format = 'YYYY-MM-DD';
const cn = location.search.indexOf('cn') !== -1;

const now = moment();
if (cn) {
  now.locale('zh-cn').utcOffset(8);
} else {
  now.locale('en-gb').utcOffset(0);
}

 export default class DatePker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: moment(props.date, format)};
    this.onChange.bind(this);
  }

  onChange(value) {
    this.setState({value: value});
    this.props.selectDate(value.format(format));   
  }

  render() {
    const state = this.state;
    const calendar = (
     <Calendar
      locale={zhCN}
      defaultValue={now}
      showToday={false}
      showDateInput={false}
      mode='date'
      style={{ zIndex: 1000, top: '36px' }}
    />);
    return (
    <div>
        <DatePicker
          animation="slide-up"
          disabled={state.disabled}
          calendar={calendar}
          value={state.value}
          onChange={(val) => this.onChange(val)}
        >
          {
            ({value}) => {
              return (
                <div className="d-rc-datepick-lineinput">
                   <div className="d-rc-datepick-lineinput-date" id='rc_datepick_lineinput_id'>{value && value.format(format)}</div>
                </div>);
            }
          }

        </DatePicker>
    </div>);
  }
}

DatePker.defaultProps = {
    date: now.format(format)
}