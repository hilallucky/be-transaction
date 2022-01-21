const Sequelize = require('sequelize');
// const sequelize = require('../../config/db/database');
const sequelize = require('../../config/db/klink_mlm2010');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const personal_gbv2 = 'check_gbv';

const PersonalQueryGBV2 = (sfno, year, month) => {
  // console.log(sfno);

    let q_gbv = "SELECT j.dfno, j.fullnm, j.sfno as sp_code, l.fullnm as sp_name, " +
                           "CONVERT(char(10), j.jointdt,103) as jointdt, " +
                           "CAST(ISNULL((SELECT TOP 1 A.adjustedrank " +
                                        "FROM klink_mlm2010.dbo.tbonus A " +
                                        "WHERE A.distributorcode=J.dfno " +
                                        "ORDER BY A.bonusyear DESC, A.bonusmonth DESC), 0) AS INT) AS [level], " +
                           "isnull(k.ppv, 0) as ppv, " +
                           "isnull(k.popv, 0) as popv, " +
                           "isnull(k.pgpv, 0) as pgpv, " +
                           "isnull(YEAR(k.period), " + year + ") as YEAR, " +
                           "isnull(MONTH(k.period), " + month + ") AS MONTH " +
                    "FROM klink_mlm2010.dbo.msmemb j " +
                          "LEFT OUTER JOIN klink_mlm2010.dbo.hsttree k ON j.dfno=k.dfno AND YEAR(k.period)=" + year + " and MONTH(k.period)=" + month + " " +
                          "LEFT OUTER JOIN klink_mlm2010.dbo.msmemb l ON J.sfno = l.dfno " +
                    "WHERE j.sfno='" + sfno + "' " +
                    "ORDER BY j.dfno ASC";
     // console.log(q_gbv);

    sequelize.query(q_gbv, {type: sequelize.QueryTypes.SELECT }).
    then(function(projects) {
      // projects;
      console.log(projects);
    });
  }


module.exports = PersonalQueryGBV2;