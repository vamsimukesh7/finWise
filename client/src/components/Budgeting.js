import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Budgeting() {

    const [AgeGroup, setAgeGroup] = useState({
        AgeGroup: ''
    })

    const [Allowance, setAllowance] = useState({
        Allowance: ''
    })

    const calculateStudentAllocations = () => {
        const necessities = Math.round(Allowance.Allowance * 0.55);
        const savings = Math.round(Allowance.Allowance * 0.15);
        const entertainment = Math.round(Allowance.Allowance * 0.15);
        const education = Math.round(Allowance.Allowance * 0.10);
        const miscellaneous = Math.round(Allowance.Allowance * 0.05);

        return {
            necessities,
            savings,
            entertainment,
            education,
            miscellaneous,
        };
    };

    const [CustomPlan, setCustomPlan] = useState({
        Necessities: '',
        Savings: '',
        Entertainment: '',
        SelfImprovement: '',
        Miscellaneous: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomPlan({ ...CustomPlan, [name]: value });
    };

    const [AllCustomPlans, setAllCustomPlans] = useState();
    useEffect(() => {
        axios.get('https://fin-wise-server.vercel.app/GetCustomPlans')
            .then(result => setAllCustomPlans(result.data))
            .catch(error => console.log(error))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://fin-wise-server.vercel.app/AddCustomPlan', CustomPlan)
                .then(result => {
                    console.log(result)
                    alert('New Custom plan Added')
                    window.location.reload();
                })
                .catch(error => console.log(error))
        } catch (error) {
            console.error('Error adding custom plan:', error);
        }
    };

    const calculate30sAllocations = () => {
        const necessities = Math.round(Allowance.Allowance * 0.50);
        const savings = Math.round(Allowance.Allowance * 0.20);
        const entertainment = Math.round(Allowance.Allowance * 0.15);
        const education = Math.round(Allowance.Allowance * 0.10);
        const miscellaneous = Math.round(Allowance.Allowance * 0.05);

        return {
            necessities,
            savings,
            entertainment,
            education,
            miscellaneous,
        };
    };

    const calculate50AboveAllocations = () => {
        const allowances = Allowance.Allowance;
        const necessities = Math.round(allowances * 0.45);
        const savings = Math.round(allowances * 0.30);
        const entertainment = Math.round(allowances * 0.15);
        const medical = Math.round(allowances * 0.10);
        const miscellaneous = Math.round(allowances * 0.05);

        return {
            necessities,
            savings,
            entertainment,
            medical,
            miscellaneous,
        };
    };

    const calculateCustomAllocations = () => {
        // Find the selected custom plan from AllCustomPlans
        const selectedCustomPlan = AllCustomPlans.find(plan => plan.id === parseInt(AgeGroup.AgeGroup.replace('Custom', '')));
        if (!selectedCustomPlan) return null; // Return null if the selected custom plan is not found

        // Calculate actual expenditures based on the percentages in the selected custom plan
        const necessities = Math.round(Allowance.Allowance * (selectedCustomPlan.Necessities / 100));
        const savings = Math.round(Allowance.Allowance * (selectedCustomPlan.Savings / 100));
        const entertainment = Math.round(Allowance.Allowance * (selectedCustomPlan.Entertainment / 100));
        const selfImprovement = Math.round(Allowance.Allowance * (selectedCustomPlan.SelfImprovement / 100));
        const miscellaneous = Math.round(Allowance.Allowance * (selectedCustomPlan.Miscellaneous / 100));

        return {
            necessities,
            savings,
            entertainment,
            selfImprovement,
            miscellaneous,
        };
    };



    return (
        <div className='Budgeting'>
            <div className='Input'>
                <label>Monthly Allowance: </label>
                <input value={Allowance.Allowance} onChange={(e) => setAllowance({ ...Allowance, Allowance: e.target.value })} />
                <label>Age Group: </label>
                <select onChange={(e) => setAgeGroup({ ...AgeGroup, AgeGroup: e.target.value })}>
                    <option>--Select--</option>
                    <option value='Student'>Student</option>
                    <option value='30s'>30s & 40s</option>
                    <option value='50+'>50+</option>
                    {
                        AllCustomPlans && AllCustomPlans.map((Element, idx) => {
                            return (
                                <option key={idx} value={`Custom$idx`}>CustomPlan - {idx}</option>
                            )
                        })
                    }
                </select>
                <button className='btn btn-primary btn-sm' data-bs-toggle="modal" data-bs-target="#AddCustomPlanModal">Add Custom Budget Plan</button>
                <div class="modal fade" id="AddCustomPlanModal" tabindex="-1" aria-labelledby="AddCustomPlanModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <form onSubmit={handleSubmit}>
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="AddCustomPlanModalLabel">Custom Plan</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="AddNew modal-body">

                                    <div className="form-group">
                                        <label htmlFor="necessities">Necessities:</label>
                                        <input type="text" className="form-control" id="necessities" name="Necessities" value={CustomPlan.Necessities} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="savings">Savings:</label>
                                        <input type="text" className="form-control" id="savings" name="Savings" value={CustomPlan.Savings} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="entertainment">Entertainment:</label>
                                        <input type="text" className="form-control" id="entertainment" name="Entertainment" value={CustomPlan.Entertainment} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="selfImprovement">Self Improvement:</label>
                                        <input type="text" className="form-control" id="selfImprovement" name="SelfImprovement" value={CustomPlan.SelfImprovement} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="miscellaneous">Miscellaneous:</label>
                                        <input type="text" className="form-control" id="miscellaneous" name="Miscellaneous" value={CustomPlan.Miscellaneous} onChange={handleChange} />
                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type='submit' class="btn btn-primary">Add Plan</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {
                    AgeGroup.AgeGroup === 'Student' &&
                    <div className='Allowance pop-in'>
                        <p>Toal Montly Allowance - ₹{Allowance.Allowance} </p>
                        {
                            Allowance.Allowance > 0 &&
                            (
                                <div className='AllowanceDistribution'>
                                    <div className='Distribuition'><label>Necessities:</label> <p>₹{calculateStudentAllocations().necessities}</p></div>
                                    <div className='Distribuition'><label>Savings:</label> <p>₹{calculateStudentAllocations().savings}</p></div>
                                    <div className='Distribuition'><label>Entertainment:</label> <p>₹{calculateStudentAllocations().entertainment}</p></div>
                                    <div className='Distribuition'><label>Self Improvment:</label> <p>₹{calculateStudentAllocations().education}</p></div>
                                    <div className='Distribuition'><label>Miscellaneous:</label> <p>₹{calculateStudentAllocations().miscellaneous}</p></div>
                                </div>
                            )
                        }
                    </div>
                }
                {
                    AgeGroup.AgeGroup === '30s' &&
                    <div className='Allowance pop-in'>
                        <p>Montly Salary : {Allowance.Allowance} </p>
                        {Allowance.Allowance > 0 && (
                            <div className='AllowanceDistribution'>
                                <div className='Distribuition'><label>Necessities:</label> <p>₹{calculate30sAllocations().necessities}</p></div>
                                <div className='Distribuition'><label>Savings:</label> <p>₹{calculate30sAllocations().savings}</p></div>
                                <div className='Distribuition'><label>Entertainment:</label> <p>₹{calculate30sAllocations().entertainment}</p></div>
                                <div className='Distribuition'><label>Self Improvment:</label> <p>₹{calculate30sAllocations().education}</p></div>
                                <div className='Distribuition'><label>Miscellaneous:</label> <p>₹{calculate30sAllocations().miscellaneous}</p></div>
                            </div>
                        )}
                    </div>
                }
                {
                    AgeGroup.AgeGroup === '50+' &&
                    <div className='Allowance pop-in'>
                        <p>Montly Salary / Pension : {Allowance.Allowance} </p>
                        <div className='AllowanceDistribution'>
                            <div className='Distribuition'><label>Necessities:</label> <p>₹{calculate50AboveAllocations().necessities}</p></div>
                            <div className='Distribuition'><label>Savings:</label> <p>₹{calculate50AboveAllocations().savings}</p></div>
                            <div className='Distribuition'><label>Entertainment:</label> <p>₹{calculate50AboveAllocations().entertainment}</p></div>
                            <div className='Distribuition'><label>Miscellaneous:</label> <p>₹{calculate50AboveAllocations().miscellaneous}</p></div>
                        </div>
                    </div>
                }
            {
    AgeGroup.AgeGroup.startsWith('Custom') && (
        <div className='Allowance pop-in'>
            <p>Custom Plan - {parseInt(AgeGroup.AgeGroup.replace('Custom', ''), 10)}</p>
            {calculateCustomAllocations() !== null && ( // Check if calculateCustomAllocations() is not null
                <div className='AllowanceDistribution'>
                    <div className='Distribution'><label>Necessities:</label> <p>₹{calculateCustomAllocations().necessities}</p></div>
                    <div className='Distribution'><label>Savings:</label> <p>₹{calculateCustomAllocations().savings}</p></div>
                    <div className='Distribution'><label>Entertainment:</label> <p>₹{calculateCustomAllocations().entertainment}</p></div>
                    <div className='Distribution'><label>Self Improvement:</label> <p>₹{calculateCustomAllocations().selfImprovement}</p></div>
                    <div className='Distribution'><label>Miscellaneous:</label> <p>₹{calculateCustomAllocations().miscellaneous}</p></div>
                </div>
            )}
        </div>
    )
}



            </div>

        </div>
    )
}
