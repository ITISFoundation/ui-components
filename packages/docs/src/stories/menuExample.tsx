import { ContextMenuProps } from '@ui-components/context-menu/src/types'
import { Add, Api, AutoAwesome, BatterySaver, Cable, East, FileOpen, Help, MenuBook, North, Save, SettingsInputAntenna, South, Tour, ViewInAr, West } from '@mui/icons-material'

const menu: ContextMenuProps['menu'] = [
  {
    title: 'New',
    shortcut: 'Ctrl+N',
    icon: <AutoAwesome fontSize='small'/>
  },
  {
    title: 'Open...',
    shortcut: 'Ctrl+O',
    icon: <FileOpen fontSize='small'/>
  },
  {
    title: 'Save',
    shortcut: 'Ctrl+S',
    icon: <Save fontSize='small'/>
  },
  {
    divider: true
  },
  {
    title: 'Expressions',
    shortcut: 'Ctrl+S',
    icon: <Save fontSize='small'/>
  },
  {
    divider: true
  },
  {
    title: 'New simulation',
    icon: <Add fontSize='small'/>,
    submenu: [
      {
        title: 'EM FDTD',
        submenu: [
          {
            title: 'Single',
            icon: <SettingsInputAntenna fontSize='small'/>
          },
          {
            title: 'Multiport',
            icon: <SettingsInputAntenna fontSize='small'/>
          }
        ]
      },
      {
        title: 'EM LF Electro',
        submenu: [
          {
            title: 'Static',
            icon: <BatterySaver fontSize='small'/>
          },
          {
            title: 'Quasi-static',
            icon: <BatterySaver fontSize='small'/>
          },
          {
            title: 'Ohmic Quasi-static',
            icon: <BatterySaver fontSize='small'/>
          }
        ]
      },
      {
        title: 'Neuron',
        submenu: [
          {
            title: 'Neuron',
            icon: <Cable fontSize='small'/>
          }
        ]
      }
    ]
  },
  {
    title: '3D View',
    icon: <ViewInAr fontSize='small'/>,
    submenu: [
      {
        title: 'North',
        icon: <North fontSize='small'/>
      },
      {
        title: 'East',
        icon: <East fontSize='small'/>
      },
      {
        title: 'South',
        icon: <South fontSize='small'/>
      },
      {
        title: 'West',
        icon: <West fontSize='small'/>
      }
    ]
  },
  {
    divider: true
  },
  {
    title: 'Help',
    icon: <Help fontSize='small'/>,
    submenu: [
      {
        title: 's4l:web Manual',
        icon: <MenuBook fontSize='small'/>
      },
      {
        title: 'API documentation',
        icon: <Api fontSize='small'/>
      },
      {
        title: 'Start tour',
        icon: <Tour fontSize='small'/>
      }
    ]
  }
]

export default menu
