import {render, screen} from '@testing-library/react'
import Home from '../pages/index'

describe('Home tests', () => {
	it('should render a heading with text `Home`', () => {
		render(<Home/>)
		const heading = screen.getByRole('heading', {name: /home/i})
		expect(heading).toBeInTheDocument()
	})
})