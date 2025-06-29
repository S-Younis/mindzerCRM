export type oppType = {
  iOpportunityId: number;
  bEr: boolean; // Edit right
  iProductId: number;
  sProductName: string;
  iUnitId: number;
  iCustomerId: number;
  sCustomer: string;
  iOpportunityStatusId: number;
  sDescription: string;
  dtCreated: Date;
  iUserAppManagerId: number;
  sUserAppManager: string;
  sProductGrade: string;
  sCurrentSuppliers: string;
  dtLastDescription: Date;
  sCompetitor: string;
  sCompetitorGrade: string;
  sCompetitorTerms: string;
  sPackaging: string;
  bOwnerValid: boolean;
  bVisibleInReport: string;
  sApplication: string;
  iCustomerOwnerId: number;
  sCustomerOwner: string;
  dtUpdated: Date;
  dtExpectedClosing_: string;
  sGP_Item_Id: string;
  sGP_Item: string;
  bTag: boolean;
  iGp_Customer_Id_: number | null;
};

export const lst_opps: oppType[] = [
  {
    iOpportunityId: 1,
    bEr: true,
    iProductId: 1,
    sProductName: 'Product A',
    iUnitId: 1,
    iCustomerId: 1,
    sCustomer: 'Customer A',
    iOpportunityStatusId: 1,
    sDescription: 'Opportunity Description A',
    dtCreated: new Date('2023-01-01'),
    iUserAppManagerId: 1,
    sUserAppManager: 'Manager A',
    sProductGrade: 'A',
    sCurrentSuppliers: 'Supplier A',
    dtLastDescription: new Date('2023-01-02'),
    sCompetitor: 'Competitor A',
    sCompetitorGrade: 'B',
    sCompetitorTerms: 'Terms A',
    sPackaging: 'Packaging A',
    bOwnerValid: true,
    bVisibleInReport: 'Yes',
    sApplication: 'Application A',
    iCustomerOwnerId: 1,
    sCustomerOwner: 'Owner A',
    dtUpdated: new Date('2023-01-03'),
    dtExpectedClosing_: '2023-01-10',
    sGP_Item_Id: 'GP001',
    sGP_Item: 'GP Item A',
    bTag: true,
    iGp_Customer_Id_: null,
  },
  {
    iOpportunityId: 2,
    bEr: false,
    iProductId: 2,
    sProductName: 'Product B',
    iUnitId: 2,
    iCustomerId: 2,
    sCustomer: 'Customer B',
    iOpportunityStatusId: 2,
    sDescription: 'Opportunity Description B',
    dtCreated: new Date('2023-02-01'),
    iUserAppManagerId: 2,
    sUserAppManager: 'Manager B',
    sProductGrade: 'B',
    sCurrentSuppliers: 'Supplier B',
    dtLastDescription: new Date('2023-02-02'),
    sCompetitor: 'Competitor B',
    sCompetitorGrade: 'C',
    sCompetitorTerms: 'Terms B',
    sPackaging: 'Packaging B',
    bOwnerValid: false,
    bVisibleInReport: 'No',
    sApplication: 'Application B',
    iCustomerOwnerId: 2,
    sCustomerOwner: 'Owner B',
    dtUpdated: new Date('2023-02-03'),
    dtExpectedClosing_: '2023-02-10',
    sGP_Item_Id: 'GP002',
    sGP_Item: 'GP Item B',
    bTag: false,
    iGp_Customer_Id_: 2,
  },
];

export const lstProducts = [
  {
    iProductId: 2,
    sProduct: 'Water',
    iUnitId: 2,
  },
  {
    iProductId: 3,
    sProduct: 'Juice',
    iUnitId: 2,
  },
  {
    iProductId: 4,
    sProduct: 'Soda',
    iUnitId: 2,
  },
  {
    iProductId: 5,
    sProduct: 'Milk',
    iUnitId: 2,
  },
];
export const lstOppStatus = [
  {
    iOpportunityStatusId: 1,
    sStatus: 'Sample',
    iTypeId: 1, //  1 = Sample  2=Rejected   3=Ongoing
  },
  {
    iOpportunityStatusId: 2,
    sStatus: 'Rejected',
    iTypeId: 2,
  },
  {
    iOpportunityStatusId: 3,
    sStatus: 'Ongoing',
    iTypeId: 3,
  },
];
