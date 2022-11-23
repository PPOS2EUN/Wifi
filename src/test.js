import React, {useCallback, useEffect} from 'react';
import { useState } from 'react';
import './App.css';
import styled, { css } from 'styled-components';

function Test() {

  const data = [{id: 'termsOfService'}, {id : 'privacyPolicy'}, {id: 'allowPromotions'}];
  const genAge = [{id: 'gender'}, {id:'age'}];
  const [, setChoiceTagID] = useState(1);
  const [clickValue, setClickValue] = useState(false);
  const [filterTag, setFilterTag] = useState([]);

  const genderCheck = [
    {id : 'female', name: 'gender', contents:'여'},
    {id : 'male', name: 'gender', contents: '남'}
  ];
  const [gen] = useState(genderCheck);

  const ageCheck = [
    {contents : '10대 미만', name: 'age', id: 'tenDown'},
    {contents : '10대', name: 'age', id: 'tenUp'},
    {contents : '20대', name: 'age', id: 'two'},
    {contents : '30대', name: 'age', id: 'three'},
    {contents : '40대', name: 'age', id: 'four'},
    {contents : '50대', name: 'age', id: 'five'},
    {contents : '60대', name: 'age', id: 'six'},
    {contents : '70대', name: 'age', id: 'seven'},
    {contents : '80대 초과', name: 'age', id: 'eightUp'}
  ];
  const [age] = useState(ageCheck);

  const policyCheck = [
    { id: 'termsOfService',
      title : '000 이용약관 동의',
      contents : '여러분을 환영합니다. 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한\n' +
          '                    서비스의 이용과 관련하여 서비스를 제공하는 주식회사(이하 ‘000’)와 이를 이용하는 서비스\n' +
          '                    회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 000 서비스 이용에 도움이 될 수 있는\n' +
          '                    유익한 정보를 포함하고 있습니다. 서비스를 이용하시거나 서비스 회원으로 가입하실 경우 여러분은 본\n' +
          '                    약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기\n' +
          '                    바랍니다.',
      value: 'termsOfService',
      class : 'after'
    },
    {
      id: 'privacyPolicy',
      title : '개인정보 수집 및 이용 동의',
      contents : '개인정보보호법에 따라 000에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및\n' +
          '                    이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니\n' +
          '                    자세히 읽은 후 동의하여 주시기 바랍니다.1. 수집하는 개인정보 이용자는 회원가입을 하지 않아도 정보 검색,\n' +
          '                    뉴스 보기 등 대부분의 네이버 서비스를 회원과 동일하게 이용할 수 있습니다. 이용자가 메일, 캘린더, 카페,\n' +
          '                    블로그 등과 같이 개인화 혹은 회원제 서비스를 이용하기 위해 회원가입을 할 경우, 네이버는 서비스 이용을\n' +
          '                    위해 필요한 최소한의 개인정보를 수집합니다.',
      value: 'privacyPolicy',
      class : 'after'
    },
    {
      id: 'allowPromotions',
      title : '프로모션 정보 수신 동의',
      contents: '000에서 제공하는 이벤트/혜택 등 다양한 정보를 휴대전화(000앱 알림 또는 문자), 이메일로 받아보실 수\n' +
          '                    있습니다. 일부 서비스(별도 회원 체계로 운영하거나 000 가입 이후 추가 가입하여 이용하는 서비스 등)의\n' +
          '                    경우, 개별 서비스에 대해 별도 수신 동의를 받을 수 있으며, 이때에도 수신 동의에 대해 별도로 안내하고\n' +
          '                    동의를 받습니다.',
      value: 'allowPromotions'
    }
  ];

  const [policy] = useState(policyCheck);

  // 클릭한 요소의 id를 인자로 받아온다.
  // 인자로 받은 id를 choiceTagID state에 담는다.
  // 클릭했을 때 true <-> false를 반복해주는 setClickValue(!clickValue);
  // id는 일부러 인덱스와 같게 해주었다. 이때 tagList의 인덱스로 접근하여, 키 isChecked의 값을 true 혹은 false으로 바꿔준다.
  // onClick 메서드

  // const clickTagBtn = id => {
  //   setChoiceTagID(id);
  //   setClickValue(!clickValue);
  //   gen[id].isChecked = !clickValue;
  // };
  //


  return (
      <div className="body">
        <div className="wrap">
          <div className="logo">
            <h1>개인정보 이용동의</h1>
          </div>

          <div className="genderAge" >
            <p id="gender" required>•성별</p>
              {gen.map(tag => (
                  <label>
                    <input key={tag.id} name={tag.name} type="radio" />
                    {tag.contents}
                  </label>
              ))}
            <p id="age" required>•연령</p>
              {age.map(tag => (
                  <label>
                    <input key={tag.id} name={tag.name} type="radio" />
                    {tag.contents}
                  </label>
              ))}
            <p></p>
            <p id="email">•이메일
              <input id="box" type="text" name="email"/>
            </p>
          </div>

          <div className="contents">
            <form action="/" method="POST" id="form__wrap">

              {/*이용 동의에 모두 동의 */}
              <div className="terms__check__all">
                <div className="terms__check__all">
                  <label><input type="checkbox" id="checkAll"/></label>
                  <label>스마트쉘터 와이파이 이용약관, 개인정보 수집 및 이용, 프로모션 정보 수신(선택)에<br/>모두 동의합니다.</label>
                </div>
              </div>

              {/*이용 동의*/}
              <ul className="terms__list">
                {policy.map(tag => (
                <li className="terms__box">
                  <div className="input__check">
                    <label className={tag.class}>
                      <input key={tag.id} name={tag.name} type="checkbox" required/>
                      {tag.title}
                    </label>
                  </div>
                  <div className="terms__content">
                    {tag.contents}
                  </div>
                </li>
                ))}
              </ul>
              
            </form>
          </div>


          </div>
      </div>
  );
}

export default Test;