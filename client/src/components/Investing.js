import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Investing() {

    const [StocksData, setStocksData] = useState({
        name: '',
        LTP: '',
        fiftytwoWeekHigh: '',
        fiftytwoWeekLow: '',
        ThirtydayROI: '',
        ThreehundreddayROI: ''
    })

    useEffect(() => {
        axios.get('http://localhost:3001/GetStocksData')
            .then(result => setStocksData(result.data))
            .catch(error => console.log(error))
    }, [])

    const [InvestIn, setInvestIn] = useState({
        InvestIn: ''
    })

    const [metaData, setMetaData] = useState({});
    const [quarterlyData, setQuarterlyData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.mfapi.in/mf/139748');
                setMetaData(response.data.meta);

                const quarterlyData = response.data.data.filter(item => {
                    const itemDate = new Date(item.date);
                    const month = itemDate.getMonth();
                    return month === 0 || month === 1 || month === 2;
                });

                setQuarterlyData(quarterlyData);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className='Investing'>
            <div className='Input'>
                <label>Investing:</label>
                <select onChange={(e) => setInvestIn({ ...InvestIn, InvestIn: e.target.value })}>
                    <option>--Select--</option>
                    <option value='Stocks'>Stocks</option>
                    <option value='FDs'>Fixed Deposits</option>
                    <option value='MF'>Mutal Funds</option>
                </select>
            </div>
            <br />
            {
                InvestIn.InvestIn === 'Stocks' &&
                <div>
                    {
                        StocksData.length > 0 && (
                            <table className='StocksTable slide-down'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Last Traded Price (LTP)</th>
                                        <th>52 Week High</th>
                                        <th>52 Week Low</th>
                                        <th>30-Day ROI</th>
                                        <th>300-Day ROI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {StocksData.map((Element, idx) => (
                                        <tr key={idx}>
                                            <td>{Element.NAME}</td>
                                            <td className='text-primary'>₹{Element.LTP}</td>
                                            <td className={parseFloat(Element.fiftytwoWeekHigh) > 0 ? 'text-success' : 'text-danger'}>₹{Element.fiftytwoWeekHigh}</td>
                                            <td className='text-danger'>₹{Element.fiftytwoWeekLow}</td>
                                            <td className={parseFloat(Element.ThirtydayROI) > 0 ? 'text-success' : 'text-danger'}>{Element.ThirtydayROI}%</td>
                                            <td className={parseFloat(Element.ThreehundreddayROI) > 0 ? 'text-success' : 'text-danger'}>{Element.ThreehundreddayROI}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )
                    }
                </div>

            }

            {
                InvestIn.InvestIn === 'MF' &&
                <div className='MF'>

                    <div className='pop-in'>
                        <h2>Scheme Information</h2>
                        <p><strong>Fund House:</strong> <span style={{ fontStyle: 'italic' }}>{metaData.fund_house}</span></p>
<p><strong>Scheme Type:</strong> <span style={{ fontStyle: 'italic' }}>{metaData.scheme_type}</span></p>
<p><strong>Scheme Category:</strong> <span style={{ fontStyle: 'italic' }}>{metaData.scheme_category}</span></p>
<p><strong>Scheme Code:</strong> <span style={{ fontStyle: 'italic' }}>{metaData.scheme_code}</span></p>
<p><strong>Scheme Name:</strong> <span style={{ fontStyle: 'italic' }}>{metaData.scheme_name}</span></p>


                    </div>
                    <div className='MFTable slide-down'>
                        <h2>Quarterly Data Points</h2>
                        {quarterlyData.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th className='text-danger'>Date</th>
                                        <th className='text-warning'>NAV - Net Asset Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {quarterlyData.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className='text-primary' style={{fontWeight:'bold'}}>{item.date}</td>
                                            <td className='text-dark' style={{fontWeight:'bold'}}>{item.nav}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No data available for January, February, and March of each year.</p>
                        )}
                    </div>


                </div>
            }

        </div>
    )
}
