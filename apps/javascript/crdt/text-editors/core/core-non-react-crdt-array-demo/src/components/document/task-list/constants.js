export const STORE_ID = 'core-crdt-task-list-1'

export const CURSOR_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2']

export const teamLists = [
  { id: 'marketing', name: 'Marketing Tasks' },
  { id: 'design', name: 'Design Tasks' },
  { id: 'agency', name: 'Agency Tasks' },
  { id: 'devshop', name: 'Dev Shop Tasks' },
]

export const teamSections = [
  { header: 'Your Teams', items: ['marketing', 'design'] },
  { header: 'External', items: ['agency', 'devshop'] },
]

export const initialTasks = [
  {
    id: 'task-1',
    title: 'Lets update the meta campaigns',
    status: 'open',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    createdAt: Date.now() - 2 * 86400000,
    commentCount: 3,
  },
  {
    id: 'task-2',
    title: 'Lets update the meta campaigns',
    status: 'in-progress',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    createdAt: Date.now() - 2 * 86400000,
    commentCount: 3,
  },
  {
    id: 'task-3',
    title: 'Lets update the meta campaigns',
    status: 'resolved',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    createdAt: Date.now() - 2 * 86400000,
    commentCount: 3,
  },
  {
    id: 'task-4',
    title: 'Lets update the meta campaigns',
    status: 'open',
    description: 'Lorem ipsum dolor sit amet.',
    createdAt: Date.now() - 2 * 86400000,
    commentCount: 3,
  },
  {
    id: 'task-5',
    title: 'Lets update the meta campaigns',
    status: 'resolved',
    description: 'Lorem ipsum dolor sit amet.',
    createdAt: Date.now() - 2 * 86400000,
    commentCount: 3,
  },
]
