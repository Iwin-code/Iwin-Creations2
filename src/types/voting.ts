export interface JurisdictionRule {
  id: string;
  name: string;
  region: string;
  flagEmoji: string;
  votingAge: number;
  preregistrationAge?: number;
  compulsory: boolean;
  notes: string;
  idRequirements: 'strict_photo' | 'photo_or_non_photo' | 'no_id_required' | 'biometric_national_id';
  onlineRegistrationAvailable: boolean;
  registrationDaysBeforeElection: number;
}

export interface EligibilityEvaluation {
  ageInput: string;
  resultMessage: string;
  status: 'idle' | 'empty' | 'invalid' | 'eligible' | 'ineligible';
  numericAge?: number;
  birthDate?: string;
  daysUntil18?: number;
  monthsUntil18?: number;
  preregistrationEligible: boolean;
  actionItems: string[];
}

export interface ChecklistState {
  isCitizen: boolean | null;
  ageVerified: boolean | null;
  residencyMet: boolean | null;
  registeredToVote: boolean | null;
  hasValidID: boolean | null;
  knowsPollingPlace: boolean | null;
}
