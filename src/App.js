import React, {useCallback, useEffect} from 'react';
import { useState } from 'react';
import './App.css';

function App() {

  const data = [{id: 'termsOfService'}, {id : 'privacyPolicy'}, {id: 'allowPromotions'}];
  const genAge = [{id: 'gender'}, {id:'age'}];

  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);
  const [checkAG, setCheckAG] = useState([]);

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems(prev => [...prev, id]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if(checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray = [];
      data.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    }
    else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  }

  // 조건이 변경되지 않으면 굳이 실행되지 않아도 괜찮을텐데 불필요하게 계속 실행되는 에러,
  // 직접 리액트에게 어떤 상황일때 이 이펙트를 실행해줘! => 의존성 배열(deps)

  //성별, 나이 전용
  const AgeGenCheck = (checked, id) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckAG(prev => [...prev, id]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckAG(checkAG.filter((el) => el !== id));
    }
  };

  const [able, setAble] = useState();

  useEffect(() => {
    console.log(checkAG);
    console.log(checkItems);
    const target = document.getElementById('BTN');

    if(checkAG.length === 2 && checkItems.includes('termsOfService')  && checkItems.includes('privacyPolicy')){
      target.disabled = false;
    }
    else{
      target.disabled = true;
    }
  }, [checkAG, checkItems]);

  return (
      <div className="body">
        <div className="wrap">
          <div className="logo">
            <h1>개인정보 이용동의</h1>
          </div>
          <div className="genderAge" >
            <p id="gender" required>•성별</p>
            <label><input type="radio"  name='gender' value='female'
                          onChange={(e) => AgeGenCheck(e.target, 'gender')} />여</label>
            <label><input type="radio"  name='gender' value='male'
                          onChange={(e) => AgeGenCheck(e.target, 'gender')}/>남</label>
            <p id="age" required>•연령</p>
            <label><input type="radio" name='age' value="tenDown"
                          onChange={(e) => AgeGenCheck(e.target, 'age')}/>10대 미만</label>
            <label><input type="radio" name='age'  value="tenUp"
                          onChange={(e) => AgeGenCheck(e.target, 'age')}/>10대</label>
            <label><input type="radio" name='age' value="two"
                          onChange={(e) => AgeGenCheck(e.target, 'age')}/>20대</label>
            <label><input type="radio" name='age' value="three"
                          onChange={(e) => AgeGenCheck(e.target, 'age')}/>30대</label>
            <label><input type="radio" name='age' value="four"
                          onChange={(e) => AgeGenCheck(e.target, 'age')}/>40대</label>
            <label><input type="radio" name='age' value="five"
                          onChange={(e) => AgeGenCheck(e.target, 'age')}/>50대</label>
            <label><input type="radio" name='age' value="six"
                          onChange={(e) => AgeGenCheck(e.target, 'age')}/>60대</label>
            <label><input type="radio" name='age' value="seven"
                          onChange={(e) => AgeGenCheck(e.target, 'age')}/>70대</label>
            <label><input type="radio" name='age' value="eight"
                          onChange={(e) => AgeGenCheck(e.target, 'age')}/>80대 초과</label>
            <p id="email">•이메일
              <input id="box" type="text" name="email"/>
            </p>
            <p></p>
          </div>

          <div className="contents">
            <form action="/" method="POST" id="form__wrap">
              <div className="terms__check__all">
                <label><input type="checkbox" id="checkAll"
                              onChange={(e) => handleAllCheck(e.target.checked)}
                              checked={checkItems.length === data.length ? true : false}  /></label>
                <label>스마트쉘터 와이파이 이용약관, 개인정보 수집 및 이용, 프로모션 정보 수신(선택)에<br/>모두 동의합니다.</label>
              </div>

              <ul className="terms__list">
                <li className="terms__box">
                  <div className="input__check">
                    <label><input
                        type="checkbox"
                        id="termsOfService" value="termsOfService" required
                        onChange={(e) => handleSingleCheck(e.target.checked, 'termsOfService')}
                        checked={checkItems.includes('termsOfService') ? true : false}
                    /></label>
                    <label className="required">000 이용약관 동의</label>
                  </div>
                  <div className="terms__content">
                    여러분을 환영합니다. 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한
                    서비스의 이용과 관련하여 서비스를 제공하는 주식회사(이하 ‘000’)와 이를 이용하는 서비스
                    회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 000 서비스 이용에 도움이 될 수 있는
                    유익한 정보를 포함하고 있습니다. 서비스를 이용하시거나 서비스 회원으로 가입하실 경우 여러분은 본
                    약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기
                    바랍니다.
                  </div>
                </li>
                <li className="terms__box">
                  <div className="input__check">
                    <label><input
                        type="checkbox"
                        id="privacyPolicy" value="privacyPolicy" required
                        onChange={(e) => handleSingleCheck(e.target.checked, 'privacyPolicy')}
                        checked={checkItems.includes('privacyPolicy') ? true : false}
                    /></label>
                    <label className="required">개인정보 수집 및 이용 동의</label>
                  </div>
                  <div className="terms__content">
                    개인정보보호법에 따라 000에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및
                    이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니
                    자세히 읽은 후 동의하여 주시기 바랍니다.1. 수집하는 개인정보 이용자는 회원가입을 하지 않아도 정보 검색,
                    뉴스 보기 등 대부분의 네이버 서비스를 회원과 동일하게 이용할 수 있습니다. 이용자가 메일, 캘린더, 카페,
                    블로그 등과 같이 개인화 혹은 회원제 서비스를 이용하기 위해 회원가입을 할 경우, 네이버는 서비스 이용을
                    위해 필요한 최소한의 개인정보를 수집합니다.
                  </div>
                </li>

                <li className="terms__box">

                  <div className="input__check">
                    <label><input
                        type="checkbox"
                        id="allowPromotions" value="allowPromotions"
                        onChange={(e) => handleSingleCheck(e.target.checked, 'allowPromotions')}
                        checked={checkItems.includes('allowPromotions') ? true : false}
                    /></label>
                    <label>프로모션 정보 수신 동의</label>
                  </div>
                  <div className="terms__content">
                    000에서 제공하는 이벤트/혜택 등 다양한 정보를 휴대전화(000앱 알림 또는 문자), 이메일로 받아보실 수
                    있습니다. 일부 서비스(별도 회원 체계로 운영하거나 000 가입 이후 추가 가입하여 이용하는 서비스 등)의
                    경우, 개별 서비스에 대해 별도 수신 동의를 받을 수 있으며, 이때에도 수신 동의에 대해 별도로 안내하고
                    동의를 받습니다.
                  </div>
                </li>
              </ul>
              <button type="submit" className="next-button" id="BTN" disabled={!able} >확인</button>


            </form>
          </div>

        </div>
      </div>
  )
}

export default App;

{/*  {data?.map((data, key) => (
        <li className="terms__box">
                  <div key={key}>
                    <div className="input__check">
                      <label><input type='checkbox' name={`select-${data.id}`}
                              onChange={(e) => handleSingleCheck(e.target.checked, data.id)}
                              checked={checkItems.includes(data.id) ? true : false} /></label>
                      <label>{data.title}</label>
                  </div>
                <div className="terms__content">{data.content}</div>
            </div>
        </li>
      ))}
*/}