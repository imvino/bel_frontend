import {useEffect, useState} from 'react';

var jwt = require('jsonwebtoken');

function Validation(props) {
    const [info, setInfo] = useState({id: '0'})

    function jtoken() {
        jwt.verify(localStorage.getItem('jwt'), process.env.REACT_APP_ACCESS_TOKEN, function (err, decoded) {
            if (err) {
                console.log('Invalid Token');
                setInfo(false)
                return null
            }
            if (decoded) {
                setInfo(decoded)
                return decoded
            }
        });
    }

    useEffect(() => {
        jtoken()
    }, [])

    return info
}

export default Validation;
