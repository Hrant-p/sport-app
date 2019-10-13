import {all, call, put, takeLatest} from 'redux-saga/effects';
import {
    changeSportType,
    footballRequestSucceed,
    setErrorsState,
    setLoadingState
} from "../store/actions/sportActionCreators";
import {sportActionTypes} from "../store/actions/actionTypes";
import {request} from "../services/requestService";
import {constructUrl} from "../API/helpers";
import {countryId, footballApi} from "../API/apiFootball";

function* multipleCountryRequest(country) {
    const {data} = yield call(
        request,
        'GET',
        constructUrl(
            [footballApi.url],
            {
                action: 'get_events',
                country_id: countryId[country],
                APIkey: footballApi.key,
                from: '2019-09-02',
                to: '2019-09-05'
            }));
    return yield {
        [country]: data.slice(0, 4)
    }
}



function* footballRequest({ payload: { history }}) {
    try {
       yield put(setLoadingState(true));
        const eng = yield call(multipleCountryRequest, 'England') ;
        const rus = yield call(multipleCountryRequest,'Russia');
        const aus = yield call(multipleCountryRequest, 'Austria');
        const den = yield call(multipleCountryRequest, 'Denmark');
        const pol = yield call(multipleCountryRequest, 'Poland');
        const fin = yield call(multipleCountryRequest, 'Italy');
        const ger = yield call(multipleCountryRequest, 'Germany');
        const norw = yield call(multipleCountryRequest, 'Norway');
        const necessaryData = yield [eng, rus, aus, den, pol, fin, ger, norw];
        console.log(necessaryData);
        yield history.push('/sports/football');
       yield put(footballRequestSucceed(necessaryData));
       yield put(changeSportType('football'));
       yield put(setLoadingState(false));

    } catch (e) {
       yield setLoadingState(false);
       yield setErrorsState(e);
       console.log(e);
    }
}

function* valleyballRequest() {
    try {
       yield put(setLoadingState(true));
       yield put(setLoadingState(false));

    } catch (e) {
       yield setLoadingState(false);
       yield setErrorsState(e);
       console.log(e);
    }
}

function* basketballRequest() {
    try {
       yield put(setLoadingState(true));
       yield put(setLoadingState(false));

    } catch (e) {
       yield setLoadingState(false);
       yield setErrorsState(e);
       console.log(e);
    }
}

function* rugbyRequest() {
    try {
       yield put(setLoadingState(true));
       yield put(setLoadingState(false));

    } catch (e) {
       yield setLoadingState(false);
       yield setErrorsState(e);
       console.log(e);
    }
}

export function* sportSaga() {
    yield all([
        takeLatest(sportActionTypes.GET_FOOTBALL_REQUEST, footballRequest),
        takeLatest(sportActionTypes.GET_BASKETBALL_REQUEST, basketballRequest),
        takeLatest(sportActionTypes.GET_VALLEYBALL_REQUEST, valleyballRequest),
        takeLatest(sportActionTypes.GET_RUGBY_REQUEST, rugbyRequest)
    ])
} 

