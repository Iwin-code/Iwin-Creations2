import React from 'react';
import { Shield, BookOpen, Clock, AlertCircle, CheckCircle2, HeartHandshake } from 'lucide-react';

export const VoterRightsGuide: React.FC = () => {
  const rights = [
    {
      title: 'Right to Cast a Provisional Ballot',
      description:
        'If election workers cannot find your name on the voter registration list, federal law (HAVA) guarantees your right to cast a provisional ballot while your registration is verified.',
      icon: Shield,
    },
    {
      title: 'Right to Vote if You Are in Line When Polls Close',
      description:
        'As long as you are physically in line at your designated polling location before the official closing time, poll workers must permit you to vote regardless of wait duration.',
      icon: Clock,
    },
    {
      title: 'Right to Assistance & Accessibility',
      description:
        'Voters with disabilities or language barriers have the right to receive assistance inside the voting booth from a friend, family member, or designated poll worker.',
      icon: HeartHandshake,
    },
    {
      title: 'Right to a Replacement Ballot for Mistakes',
      description:
        'If you make an error or accidental mark on a paper ballot, you are entitled to return the spoiled ballot to poll workers and receive a fresh ballot.',
      icon: CheckCircle2,
    },
    {
      title: 'Freedom from Voter Intimidation',
      description:
        'It is illegal for anyone to challenge, intimidate, question, or photograph voters with the intent of suppressing participation inside or near polling stations.',
      icon: AlertCircle,
    },
    {
      title: 'Time Off from Work to Vote',
      description:
        'Over 30 states mandate paid or unpaid leave allowances for employees to cast ballots during polling hours if their work schedule does not permit sufficient voting time.',
      icon: BookOpen,
    },
  ];

  return (
    <section id="voter-guide" className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">
            <span>Constitutional Protections</span>
            <span aria-hidden="true">·</span>
            <span>Civic Bill of Rights</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Voter Rights & Protections Guide
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Know your legal rights at the ballot box. These federal and statutory protections ensure every eligible citizen can cast a ballot fairly and securely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
