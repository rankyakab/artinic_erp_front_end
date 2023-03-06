import { combineReducers } from 'redux';
import memoReducer from './MemoReducer';
import voucherReducer from './VoucherReducer';
import staffReducer from './StaffReducer';
import circularReducer from './CircularReducer';
import maintenanceReducer from './MaintenanceReducer';
import logisticsReducer from './LogisticsReducer';
import authReducer from './AuthReducer';
import receiptReducer from './ReceiptsReducer';
import invoiceReducer from './InvoiceReducer';
import roleReducer from './RoleReducer';
import actionReducer from './ActionReducer';
import processReducer from './ProcessReducer';
import privilegeReducer from './PrivilegeReducer';
import procurementsReducer from './ProcurementsReducer';
import trainingReducer from './TrainingReducer';
import budgetsReducer from './BudgetsReducer';
import stocksReducer from './StocksReducer';
import projectsReducer from './ProjectsReducer';
import clientBalanceReducer from './ClientBalanceReducer';
import expensesReducer from './ExpensesReducer';
import payrollReducer from './PayrollReducer';
import approvalReducer from './ApprovalReducer';
import clientsReducer from './ClientsReducer';
import protypeReducer from './ProtypeReducer';
import userReducer from './UserReducer';

export default combineReducers({
  auth: authReducer,
  memo: memoReducer,
  voucher: voucherReducer,
  staff: staffReducer,
  circular: circularReducer,
  maintenance: maintenanceReducer,
  logistics: logisticsReducer,
  receipt: receiptReducer,
  invoice: invoiceReducer,
  role: roleReducer,
  action: actionReducer,
  process: processReducer,
  privilege: privilegeReducer,
  procurements: procurementsReducer,
  training: trainingReducer,
  budgets: budgetsReducer,
  stocks: stocksReducer,
  projects: projectsReducer,
  clientBalance: clientBalanceReducer,
  expenses: expensesReducer,
  payroll: payrollReducer,
  approval: approvalReducer,
  clients: clientsReducer,
  protype: protypeReducer,
  user: userReducer,
});
