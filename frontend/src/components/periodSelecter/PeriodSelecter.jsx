import React from 'react';
import "./PeriodSelecter.css";

/**
 * PeriodSelector コンポーネント
 * 勉強履歴の表示期間を選択するためのラジオボタンと送信ボタンを提供する
 * 
 * @param {Object} props
 * @param {Function} props.handlePeriodChange - 表示期間期間変更時のハンドラ関数
 * @param {Function} props.handleSubmit - フォーム送信時のハンドラ関数
 * @returns {JSX.Element} PeriodSelector コンポーネントの JSX
 */
export default function PeriodSelector({ handlePeriodChange, handleSubmit }) {
	/**
     * フォーム送信時の処理を行う関数
     * @param {Event} e - フォーム送信イベント
     */
	const handleInputChange = (e) => {
        handleSubmit(e);
    };

	/**
     * ラジオボタン変更時の処理を行う関数
     * @param {Event} e - ラジオボタン変更イベント
     */
	const handleChangeButton = (e) => {
		handlePeriodChange(e);
	}

    return (
		<>
		 <div className="displayPeriod">
			<div className="displayPeriodMsg">表示期間</div>
			<form className="form" onSubmit={ handleInputChange }>
				<div className="radioButtons">
					<div className="radioButton">
						<label><input type="radio" id="all" name="period" value="all" checked onChange={handleChangeButton} />すべて</label>
					</div>
					<div className="radioButton">
						<label><input type="radio" id="1week" name="period" value="1week" onChange={handleChangeButton} />1週間</label>
					</div>
					<div className="radioButton">
						<label><input type="radio" id="1month" name="period" value="1month" onChange={handleChangeButton} />1ヶ月</label>
					</div>
					<div className="radioButton">
						<label><input type="radio" id="1year" name="period" value="1year" onChange={handleChangeButton} />1年</label>
					</div>
				</div>
				<button type="submit" className="deceidePeriod">この条件で表示する</button>
			</form>
		</div>
		</>
    );
}