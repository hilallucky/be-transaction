
const reportRoutes = {

  //Personal Bonus
  // 'POST /getPersonalListBonus': 'PersonalQueryBonusController.getPersonalListBonus',
  // 'POST /getPersonalDetailBonus': 'PersonalQueryBonusController.getPersonalDetailBonus',
  'POST /getBonusPDF': 'reportController.reportControllerPDF',
  'POST /testGeneratePDF': 'reportController.testGeneratePDF',
};

module.exports = reportRoutes;
