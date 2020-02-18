import * as React from 'react'
import 'react-vis/dist/style.css'
import { Sunburst } from 'react-vis'

function randomLeaf(): Record<string, any> {
  return {
    size: Math.random() * 1000,
    color: Math.random(),
  }
}

function updateData(): Record<string, any> {
  const totalLeaves = Math.random() * 20
  const leaves = []
  for (let i = 0; i < totalLeaves; i++) {
    const leaf = randomLeaf()
    if (Math.random() > 0.8) {
      // SOMETHING NOT WORKING HERE. CHILDREN MAP FUNCTION NOT GOING
      leaf.children = new Array(3)
      leaf.children.map(() => {
        const newEl = randomLeaf()
        console.log('CHILD IS: ', newEl)
      })
      console.log('after: ', leaf)
    }
    leaves.push(leaf)
  }
  return {
    title: '',
    color: 1,
    children: leaves,
  }
}

const DIVERGING_COLOR_SCALE = ['#00939C', '#85C4C8', '#EC9370', '#C22E00']

export default class SunburstSDG extends React.Component<{}> {
  state = {
    data: updateData(),
    hovering: false,
  }

  render(): JSX.Element {
    const { data, hovering } = this.state
    return (
      <div className="animated-sunburst-example-wrapper">
        <div>{hovering ? 'CURRENTLY HOVERING' : 'NOT HOVERED'}</div>
        <Sunburst
          animation={{ damping: 20, stiffness: 300 }}
          data={data}
          colorType={'category'}
          colorRange={DIVERGING_COLOR_SCALE}
          style={{ stroke: '#fff' }}
          onValueMouseOver={(): void => this.setState({ hovering: true })}
          onValueMouseOut={(): void => this.setState({ hovering: false })}
          height={300}
          width={350}
        />
      </div>
    )
  }
}
