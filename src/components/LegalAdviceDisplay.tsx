import React from 'react';
import { CheckCircle, ExternalLink, FileText, AlertTriangle } from 'lucide-react';
import { InfoCard } from './InfoCard';
import type { LegalAdviceResponse } from '../hooks/useOpenAI';

interface LegalAdviceDisplayProps {
  advice: LegalAdviceResponse;
}

export function LegalAdviceDisplay({ advice }: LegalAdviceDisplayProps) {
  return (
    <div className="space-y-4">
      {/* Legal Summary */}
      <InfoCard variant="default">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">Legal Summary</h3>
            <p className="text-white/90 leading-relaxed">{advice.summary}</p>
          </div>
        </div>
      </InfoCard>

      {/* Actionable Steps */}
      {advice.actionableSteps && advice.actionableSteps.length > 0 && (
        <InfoCard variant="actionable">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-3">Next Steps</h3>
              <div className="space-y-2">
                {advice.actionableSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <p className="text-white/90 flex-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </InfoCard>
      )}

      {/* Templates */}
      {advice.templates && advice.templates.length > 0 && (
        <InfoCard variant="default">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-3">Document Templates</h3>
              <div className="space-y-3">
                {advice.templates.map((template, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-3">
                    <pre className="text-white/90 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                      {template}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </InfoCard>
      )}

      {/* Legal Citations */}
      {advice.citations && advice.citations.length > 0 && (
        <InfoCard variant="default">
          <div className="flex items-start gap-3">
            <ExternalLink className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-3">Legal References</h3>
              <div className="space-y-3">
                {advice.citations.map((citation, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="text-white font-medium text-sm">{citation.title}</h4>
                        <p className="text-accent text-sm font-mono">{citation.citation}</p>
                        <p className="text-white/70 text-sm mt-1">{citation.summary}</p>
                      </div>
                      {citation.url && (
                        <a
                          href={citation.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </InfoCard>
      )}

      {/* Legal Resources */}
      {advice.resources && advice.resources.length > 0 && (
        <InfoCard variant="default">
          <div className="flex items-start gap-3">
            <ExternalLink className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-3">Helpful Resources</h3>
              <div className="space-y-3">
                {advice.resources.map((resource, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-white font-medium text-sm">{resource.title}</h4>
                          {resource.isOfficial && (
                            <span className="bg-accent/20 text-accent text-xs px-2 py-1 rounded-full">
                              Official
                            </span>
                          )}
                        </div>
                        <p className="text-white/70 text-sm">{resource.description}</p>
                      </div>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </InfoCard>
      )}

      {/* Sources (fallback) */}
      {advice.sources && advice.sources.length > 0 && (
        <InfoCard variant="default">
          <div className="flex items-start gap-3">
            <ExternalLink className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-3">Additional Sources</h3>
              <div className="space-y-2">
                {advice.sources.map((source, index) => (
                  <div key={index} className="text-white/80 text-sm">
                    • {source}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </InfoCard>
      )}

      {/* Disclaimer */}
      <InfoCard variant="default">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-yellow-400 mb-1">Important Disclaimer</h4>
            <p className="text-white/70 text-sm">
              This information is for educational purposes only and does not constitute legal advice. 
              Please consult with a qualified legal professional for advice specific to your situation.
            </p>
          </div>
        </div>
      </InfoCard>
    </div>
  );
}
