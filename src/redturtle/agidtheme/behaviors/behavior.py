# -*- coding: utf-8 -*-
from plone.autoform.interfaces import IFormFieldProvider
from plone.dexterity.interfaces import IDexterityContent
from plone.supermodel import model
from redturtle.agidtheme import _
from zope.component import adapter
from zope.interface import implementer
from zope.interface import provider
from zope import schema


@provider(IFormFieldProvider)
class IClassOnView(model.Schema):
    """ Marker interface """
    class_on_view = schema.TextLine(
        title=_(u'label_class_on_view', default=u'CSS Class'),
        description=_(
            u'help_class_on_view',
            default=u'Insert CSS Class'),
        required=False,
        )

    model.fieldset(
        'layout',
        label=_(u"Layout"),
        fields=[
            'class_on_view',
        ]
    )

@implementer(IClassOnView)
@adapter(IDexterityContent)
class ClassOnView(object):

    def __init__(self, context):
        self.context = context
