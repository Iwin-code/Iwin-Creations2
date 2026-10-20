import { EligibilityEvaluation } from '../types/voting';

export function evaluateKivyVote(
  rawInput: string,
  minVotingAge: number = 18
): EligibilityEvaluation {
  const ageText = rawInput.trim();

  if (ageText === '') {
    return {
      ageInput: rawInput,
      resultMessage: 'Please enter your age.',
      status: 'empty',
      preregistrationEligible: false,
      actionItems: ['Enter your age as an integer number (e.g. 18, 25).'],
    };
  }

  // Strict integer conversion matching Python's int() behavior
  // In Python: int("18") -> 18, int("18.5") -> ValueError, int("abc") -> ValueError
  const isStrictInteger = /^-?\d+$/.test(ageText);
  if (!isStrictInteger) {
    return {
      ageInput: rawInput,
      resultMessage: 'Please enter a valid number.',
      status: 'invalid',
      preregistrationEligible: false,
      actionItems: ['Please type whole digits only without decimals or special symbols.'],
    };
  }

  const age = Number.parseInt(ageText, 10);

  if (age < 0 || age > 130) {
    return {
      ageInput: rawInput,
      resultMessage: 'Please enter a valid number.',
      status: 'invalid',
      numericAge: age,
      preregistrationEligible: false,
      actionItems: ['Please enter a realistic human age between 0 and 130.'],
    };
  }

  if (age >= minVotingAge) {
    return {
      ageInput: rawInput,
      resultMessage: '✅ You are eligible to vote.',
      status: 'eligible',
      numericAge: age,
      preregistrationEligible: false,
      actionItems: [
        'Check your voter registration status with your local election office.',
        'Review your state or regional photo ID requirements.',
        'Find your assigned polling location or request a mail-in ballot.',
      ],
    };
  } else {
    const yearsRemaining = minVotingAge - age;
    const canPreregister = age >= 16;

    return {
      ageInput: rawInput,
      resultMessage: '❌ You are not eligible to vote.',
      status: 'ineligible',
      numericAge: age,
      preregistrationEligible: canPreregister,
      actionItems: [
        canPreregister
          ? `You are ${age} years old. In many jurisdictions, you can pre-register now so your registration activates the day you turn ${minVotingAge}.`
          : `You will be eligible to cast a ballot in ${yearsRemaining} year${yearsRemaining > 1 ? 's' : ''}.`,
        'Explore your local student government and community civics programs.',
        'Learn about ballot measures and how local governments serve your community.',
      ],
    };
  }
}

export function calculateAgeFromBirthDate(birthDateStr: string): {
  age: number;
  daysUntil18: number;
  monthsUntil18: number;
  is18OrOlder: boolean;
  turningDate18: Date;
} | null {
  if (!birthDateStr) return null;
  const birth = new Date(birthDateStr);
  if (Number.isNaN(birth.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  const turningDate18 = new Date(birth);
  turningDate18.setFullYear(birth.getFullYear() + 18);

  const diffTime = turningDate18.getTime() - today.getTime();
  const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const diffMonths = Math.max(0, Math.ceil(diffDays / 30.44));

  return {
    age,
    daysUntil18: diffDays,
    monthsUntil18: diffMonths,
    is18OrOlder: age >= 18,
    turningDate18,
  };
}

export const ORIGINAL_KIVY_CODE = `import kivy
from kivy.app import App
from kivy.lang import Builder
from kivy.properties import StringProperty
from kivy.uix.boxlayout import BoxLayout

KV = Builder.load_file("ij_svet.kv")


class MainLayout(BoxLayout):
    result = StringProperty("")

    def check_vote(self):
        age_text = self.ids.age_input.text.strip()

        if age_text == "":
            self.result = "Please enter your age."
            return

        try:
            age = int(age_text)

            if age >= 18:
                self.result = "✅ You are eligible to vote."
            else:
                self.result = "❌ You are not eligible to vote."

        except ValueError:
            self.result = "Please enter a valid number."


class IJS_VET(App):
    def build(self):
        self.title = "IJS_VET"
        return MainLayout()


if __name__ == "__main__":
    IJS_VET().run()`;

export const ORIGINAL_KV_CODE = `<MainLayout>:
    orientation: 'vertical'
    padding: dp(24)
    spacing: dp(16)
    canvas.before:
        Color:
            rgba: 0.12, 0.14, 0.18, 1
        Rectangle:
            pos: self.pos
            size: self.size

    Label:
        text: "IJS_VET"
        font_size: '28sp'
        bold: True
        size_hint_y: None
        height: dp(50)
        color: 1, 1, 1, 1

    Label:
        text: "Voter Eligibility Checker"
        font_size: '16sp'
        size_hint_y: None
        height: dp(30)
        color: 0.7, 0.75, 0.8, 1

    TextInput:
        id: age_input
        hint_text: "Enter your age"
        multiline: False
        input_filter: 'int'
        font_size: '18sp'
        size_hint_y: None
        height: dp(48)
        padding: [dp(12), dp(12)]

    Button:
        text: "Check Eligibility"
        font_size: '18sp'
        size_hint_y: None
        height: dp(50)
        background_color: 0.15, 0.45, 0.85, 1
        on_release: root.check_vote()

    Label:
        id: result_label
        text: root.result
        font_size: '18sp'
        size_hint_y: 1
        halign: 'center'
        valign: 'middle'
        color: 1, 1, 1, 1`;
