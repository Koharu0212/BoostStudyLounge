import React from 'react';
import "./PeriodSelecter.css";

export default function PeriodSelector({ handlePeriodChange, handleSubmit }) {
	const handleInputChange = (e) => {
        handleSubmit(e);
    };

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
						<label><input type="radio" id="all" name="period" value="all"  onChange={handleChangeButton} />すべて</label>
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