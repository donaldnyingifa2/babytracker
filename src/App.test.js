import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import FeedingTracker from './FeedingTracker';
import MilestoneTracker from './MilestoneTracker';
// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;


describe('Baby Tracker App', () => {

  it('renders without crashing', () => {
    render(<App />);
    // Check if a main element or title exists
    expect(screen.getByRole('heading', { name: /Baby Tracker/i })).toBeInTheDocument();


  });

  it('should render FeedingTracker and MilestoneTracker components', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Feeding Tracker/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Milestone Tracker/i })).toBeInTheDocument();
    expect(screen.getByText(/Pumping Sessions/i)).toBeInTheDocument();
    expect(screen.getByText(/Sleep Tracking/i)).toBeInTheDocument();
  });



  describe('Feeding Tracker', () => {

    it('should add breast feeding entry with side and time', () => {
      render(<FeedingTracker />);
      // Select breast side
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'left breast' } });

      // Add feeding entry
      fireEvent.click(screen.getByRole('button', { name: /Add Feeding/i }));

    });



    it('should add bottle feeding entry with quantity and time', () => {
      render(<FeedingTracker />);
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'formula' } });
      fireEvent.change(screen.getByRole('textbox', { name: /Amount \(oz\)/i }), { target: { value: '4' } }); // Example quantity
      fireEvent.change(screen.getByRole('textbox', { name: /time/i }), { target: { value: '09:00' } });

      fireEvent.click(screen.getByRole('button', { name: /Add Feeding/i }));

    });

  });

  describe('Milestone Tracker', () => {
    it('should add a milestone', () => {
      render(<MilestoneTracker />);
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'social' } });
      fireEvent.change(screen.getByRole('textbox', { name: /Description/i }), { target: { value: 'Smiled at a stranger' } });
      fireEvent.change(screen.getByRole('textbox', { name: /date/i }), { target: { value: '2024-10-26' } });
      fireEvent.click(screen.getByRole('button', { name: /Add Milestone/i }));
      expect(screen.getByText(/social/i)).toBeInTheDocument();
      expect(screen.getByText(/Smiled at a stranger/i)).toBeInTheDocument();

    });
  });

  describe('Pumping Sessions', () => {
    it('should add a pumping session with quantity and time', () => {
      render(<App />);
      fireEvent.change(screen.getByRole('textbox', { name: /Quantity \(ml\)/i }), { target: { value: '120' } });
      fireEvent.change(screen.getByRole('textbox', { name: /Pumping Date and Time/i }), { target: { value: '2024-10-10T14:30' } });
      fireEvent.click(screen.getByRole('button', { name: /Add Pumping Session/i }));
      expect(screen.getByText(/120 ml/i)).toBeInTheDocument();
      expect(screen.getByText(/2024-10-10 14:30/i)).toBeInTheDocument();
    });

    it('should not add a pumping session with invalid quantity', () => {
      render(<App />);
      fireEvent.change(screen.getByRole('textbox', { name: /Quantity \(ml\)/i }), { target: { value: '-50' } });
      fireEvent.change(screen.getByRole('textbox', { name: /Pumping Date and Time/i }), { target: { value: '2024-10-10T14:30' } });
      fireEvent.click(screen.getByRole('button', { name: /Add Pumping Session/i }));
      expect(screen.getByText(/Invalid quantity/i)).toBeInTheDocument();
    });
  });

  describe('Sleep Tracking', () => {
    it('should add a sleep session with start and end time', () => {
      render(<App />);
      fireEvent.change(screen.getByRole('textbox', { name: /Sleep Start Time/i }), { target: { value: '2024-10-10T20:00' } });
      fireEvent.change(screen.getByRole('textbox', { name: /Sleep End Time/i }), { target: { value: '2024-10-11T06:00' } });
      fireEvent.click(screen.getByRole('button', { name: /Add Sleep Session/i }));
      expect(screen.getByText(/2024-10-10 20:00/i)).toBeInTheDocument();
      expect(screen.getByText(/2024-10-11 06:00/i)).toBeInTheDocument();
      expect(screen.getByText(/Duration: 10 hours/i)).toBeInTheDocument();
    });

    it('should not add a sleep session with end time before start time', () => {
      render(<App />);
      fireEvent.change(screen.getByRole('textbox', { name: /Sleep Start Time/i }), { target: { value: '2024-10-10T20:00' } });
      fireEvent.change(screen.getByRole('textbox', { name: /Sleep End Time/i }), { target: { value: '2024-10-10T18:00' } });
      fireEvent.click(screen.getByRole('button', { name: /Add Sleep Session/i }));
      expect(screen.getByText(/End time must be after start time/i)).toBeInTheDocument();
    });
  });

  describe('Medicine Intake Tracking', () => {
    it('should add a medicine intake entry', () => {
      render(<App />);
      fireEvent.change(screen.getByRole('textbox', { name: /Medication/i }), { target: { value: 'Ibuprofen' } });
      fireEvent.change(screen.getByRole('textbox', { name: /Dosage/i }), { target: { value: '5ml' } });
      fireEvent.change(screen.getByRole('textbox', { name: /Medicine Date and Time/i }), { target: { value: '2024-10-10T10:00' } });
      fireEvent.click(screen.getByRole('button', { name: /Add Medicine/i }));
      expect(screen.getByText(/Ibuprofen/i)).toBeInTheDocument();
      expect(screen.getByText(/5ml/i)).toBeInTheDocument();
      expect(screen.getByText(/2024-10-10 10:00/i)).toBeInTheDocument();
    });
  });

  describe('Teething Tracker', () => {
    it('should allow selecting grown teeth', () => {
      render(<App />);
      fireEvent.click(screen.getByRole('checkbox', { name: /Upper Right Central Incisor/i }));
      fireEvent.click(screen.getByRole('checkbox', { name: /Lower Left Lateral Incisor/i }));
      fireEvent.click(screen.getByRole('button', { name: /Update Teething/i }));
      expect(screen.getByText(/Upper Right Central Incisor/i)).toBeInTheDocument();
      expect(screen.getByText(/Lower Left Lateral Incisor/i)).toBeInTheDocument();
    });
  });

  describe('Physical Growth Tracker', () => {
    it('should update baby\'s weight and height', () => {
      render(<App />);
      fireEvent.change(screen.getByRole('textbox', { name: /Weight \(kg\)/i }), { target: { value: '8.5' } });
      fireEvent.change(screen.getByRole('textbox', { name: /Height \(cm\)/i }), { target: { value: '70' } });
      fireEvent.change(screen.getByRole('textbox', { name: /Growth Date/i }), { target: { value: '2024-10-10' } });
      fireEvent.click(screen.getByRole('button', { name: /Update Growth/i }));
      expect(screen.getByText(/8.5 kg/i)).toBeInTheDocument();
      expect(screen.getByText(/70 cm/i)).toBeInTheDocument();
      expect(screen.getByText(/2024-10-10/i)).toBeInTheDocument();
    });
  });

  describe('Symptom Tracker', () => {
    it('should add baby\'s symptoms', () => {
      render(<App />);
      fireEvent.change(screen.getByRole('textbox', { name: /Symptoms/i }), { target: { value: 'Fever, Runny Nose' } });
      fireEvent.change(screen.getByRole('textbox', { name: /Symptom Date/i }), { target: { value: '2024-10-10' } });
      fireEvent.click(screen.getByRole('button', { name: /Add Symptoms/i }));
      expect(screen.getByText(/Fever, Runny Nose/i)).toBeInTheDocument();
      expect(screen.getByText(/2024-10-10/i)).toBeInTheDocument();
    });
  });

  describe('Reports and Insights', () => {
    it('should display a summary of all data inputs', async () => {
      render(<App />);
      fireEvent.click(screen.getByRole('button', { name: /View Summary/i }));
      expect(screen.getByText(/Feeding Summary/i)).toBeInTheDocument();
      expect(screen.getByText(/Growth Summary/i)).toBeInTheDocument();
      expect(screen.getByText(/Milestone Summary/i)).toBeInTheDocument();
    });

    it('should have a download report button', () => {
      render(<App />);
      expect(screen.getByRole('button', { name: /Download Report/i })).toBeInTheDocument();
    });

    it('should allow filtering reports by time range', async () => {
      render(<App />);
      fireEvent.change(screen.getByRole('textbox', { name: /Start Date/i }), { target: { value: '2024-09-01' } });
      fireEvent.change(screen.getByRole('textbox', { name: /End Date/i }), { target: { value: '2024-10-01' } });
      fireEvent.click(screen.getByRole('button', { name: /Generate Report/i }));

      expect(screen.getByText(/Report: 2024-09-01 to 2024-10-01/i)).toBeInTheDocument();
    });
  });

});
