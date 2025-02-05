import { Workbench } from '@ui-components/workbench/src/types'

const wb: Workbench = {
  nodes: [
    {
      id: 'sim',
      label: 'Dipole (Broadband) - EM FDTD',
      inputs: [],
      outputs: [
        { id: 'convergence', label: 'Convergence' },
        { id: 'input_power', label: 'Input Power' },
        { id: 'lines_1', label: 'Lines 1' },
        { id: 'overall_field', label: 'Overall Field' }
      ]
    },
    {
      id: 'lines',
      label: 'Lines 1',
      inputs: [
        { id: 'lines_1_1', label: 'Lines 1' }
      ],
      outputs: [
        { id: 'em_U_f', label: 'EM U(f)' },
        { id: 'em_I_f', label: 'EM I(f)' },
        { id: 'em_P_f', label: 'EM P(f)' },
        { id: 'em_U_t', label: 'EM U(t)' },
        { id: 'em_I_t', label: 'EM I(t)' },
        { id: 'rc_f', label: 'Reflection Coefficient (f)' },
        { id: 'vswr_f', label: 'VSWR(f)' },
        { id: 'em_i_imp_f', label: 'EM Input Impedance (f)' }
      ]
    },
    {
      id: 'overall',
      label: 'Overall Field',
      inputs: [
        { id: 'overall', label: 'Overall Field' }
      ],
      outputs: [
        { id: 'em_e_xyz', label: 'EM E(x,y,z,f0)' },
        { id: 'em_h_xyz', label: 'EM H(x,y,z,f0)' },
        { id: 'd_xyz', label: 'D(x,y,z,f0)' },
        { id: 'b_xyz', label: 'B(x,y,z,f0)' },
        { id: 'surf_j_xyz', label: 'Surface-J(x,y,z,f0)' },
        { id: 'j_xyz', label: 'J(x,y,z,f0)' },
        { id: 's_xyz', label: 'S(x,y,z,f0)' },
        { id: 'ei_loss', label: 'EI. Loss Density(x,y,z,f0)' },
        { id: 'e_density', label: 'Energy Denisty(x,y,z,f0)' },
        { id: 'sar', label: 'SAR(x,y,z,f0)' },
        { id: 'b1', label: 'B1(x,y,z,f0)' },
        { id: 'pb', label: 'Power Balance' },
        { id: 'sibc', label: 'SIBC Power Absorption' }
      ]
    },
    {
      id: 'rf',
      label: 'Reflection Coefficient(f) - Plot',
      inputs: [
        { id: 'rc_f_2', label: 'Reflection Coefficient(f)' }
      ],
      outputs: []
    },
    {
      id: 'sv',
      label: 'EM E(x,y,z,f0) - Slice Viewer',
      inputs: [
        { id: 'em_f_xyz', label: 'EM E(x,y,z,f0)' }
      ],
      outputs: []
    },
    {
      id: 'fft',
      label: 'Far Field Transform',
      inputs: [
        { id: 'em_e_xyz_2', label: 'EM E(x,y,z,f0)' },
        { id: 'em_H_xyz_2', label: 'EM H(x,y,z,f0)' }
      ],
      outputs: [
        { id: 'em_far', label: 'EM Far Field(theta,phi,f0)' }
      ]
    },
    {
      id: 'pb',
      label: 'Power Balance - Table Viewer',
      inputs: [
        { id: 'pb_2', label: 'Power Balance' }
      ],
      outputs: []
    },
    {
      id: 'em_ff',
      label: 'Power Balance - Table Viewer',
      inputs: [
        { id: 'em_ff', label: 'EM Far Field(theta,phi,f0)' }
      ],
      outputs: []
    }
  ],
  connections: [
    { orig: 'lines_1' , dest: 'lines_1_1' },
    { orig: 'overall_field' , dest: 'overall' },
    { orig: 'rc_f' , dest: 'rc_f_2' },
    { orig: 'em_e_xyz' , dest: 'em_f_xyz' },
    { orig: 'em_e_xyz' , dest: 'em_e_xyz_2' },
    { orig: 'em_h_xyz' , dest: 'em_H_xyz_2' },
    { orig: 'pb' , dest: 'pb_2' },
    { orig: 'em_far' , dest: 'em_ff' }
  ]
}

export default wb
